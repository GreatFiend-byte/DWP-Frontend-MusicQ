const express = require("express");
const cors = require("cors"); // Importa el paquete cors
const { db } = require("./firebase-admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Configura CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true, // Permite el envío de credenciales (cookies, tokens)
}));

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Clave secreta para firmar los tokens JWT (debería estar en una variable de entorno)
const JWT_SECRET = "aXdlbI5KwLJx1zPv0yXZtR0AeFGRHzJ5mWV2wz+6AQk=";

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido o expirado" });
        }
        req.user = user; // Almacena los datos del usuario en el objeto `req`
        next(); // Continúa con la siguiente función (controlador de la ruta)
    });
};

// Endpoint para registrar un nuevo usuario
app.post("/api/register", async (req, res) => {
    try {
        const { email, username, password, nombre, apellido } = req.body;

        // Validar que todos los campos estén presentes
        if (!email || !username || !password || !nombre || !apellido) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de hashing

        // Crear un nuevo usuario en Firestore
        const userRef = await db.collection("users").add({
            email,
            username,
            password: hashedPassword, // Almacena la contraseña hasheada
            nombre,
            apellido,
            createdAt: new Date(),
        });

        // Devolver una respuesta exitosa
        res.status(201).json({
            message: "Usuario registrado con éxito",
            userId: userRef.id,
        });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Endpoint para iniciar sesión
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validar que los campos estén presentes
        if (!username || !password) {
            return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
        }

        // Buscar el usuario en Firestore por su nombre de usuario
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("username", "==", username).get();

        if (snapshot.empty) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Obtener los datos del usuario
        let userData;
        let userId;
        snapshot.forEach((doc) => {
            userData = doc.data();
            userId = doc.id;
        });

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "10m" });

        // Devolver una respuesta exitosa con el token
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: userId,
                username: userData.username,
                email: userData.email,
                nombre: userData.nombre,
                apellido: userData.apellido,
            },
        });
    } catch (error) {
        console.error("Error iniciando sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Ruta protegida: Perfil del usuario
app.get("/profile", authenticateToken, (req, res) => {
    // El middleware `authenticateToken` ya verificó el token y añadió `req.user`
    res.json({
        message: "Acceso permitido",
        user: req.user, // Datos del usuario obtenidos del token
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
import React, { useEffect, useState } from "react";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import { Table, Modal, Input, Form } from "antd"; // Importar Table de Ant Design
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { editUser, deleteUser, getUsers } from "../../services/adminService.js";



const Users = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await getUsers();
                console.log(response);  // Verificar la respuesta aquí
                if (response && Array.isArray(response)) {
                    setUsuarios(response); // Aquí asignamos la respuesta directamente
                }
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsuarios(usuarios.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        form.setFieldsValue({
            username: user.username,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: user.rol,
            password: user.password // Asegúrate de agregar el valor de la contraseña aquí si es necesario
        });
        setIsModalVisible(true); // Mostrar el modal
    };


    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Validar campos del formulario
            console.log(values); // Verificar los valores a enviar
            await editUser(currentUser.id, values); // Actualizar usuario
            console.log(values); // Verificar los valores a enviar
            setUsuarios(usuarios.map(user => user.id === currentUser.id ? { ...user, ...values } : user));
            setIsModalVisible(false); // Cerrar el modal
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Cerrar el modal sin cambios
    };

    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
            width: "20%", // Ancho personalizado
        },
        {
            title: "Apellido",
            dataIndex: "apellido",  // Agregar apellido aquí
            key: "apellido",
            width: "20%", // Ancho personalizado
        },
        {
            title: "Usuario",
            dataIndex: "username",
            key: "username",
            width: "20%", // Ancho personalizado
        },
        {
            title: "Correo",
            dataIndex: "email",
            key: "email",
            width: "20%", // Ancho personalizado
        },
        {
            title: "Rol",
            dataIndex: "rol",
            key: "rol",
            width: "10%", // Ancho personalizado
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, usuario) => (
                <p>
                    <Button type="primary" onClick={() => handleEdit(usuario)}>Editar</Button>
                    <Button type="primary" onClick={() => handleDelete(usuario.id)} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}>Eliminar</Button>
                </p>
            ),
            width: "10%", // Ancho personalizado
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>Administrar Usuarios</Title>

                {/* Usamos Table de Ant Design para mostrar los usuarios */}
                <Table
                    columns={columns}
                    dataSource={usuarios}
                    rowKey="id" // Usamos "id" como clave de fila
                    pagination={false} // Desactivar paginación si es necesario
                />

                {/* Modal para editar usuario */}
                <Modal
                    title="Editar Usuario"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Guardar"
                    cancelText="Cancelar"
                >
                    <Form form={form} layout="vertical" initialValues={currentUser}>
                        <Form.Item
                            name="username"
                            label="Nombre de Usuario"
                            rules={[{ required: true, message: "Por favor ingrese el nombre de usuario" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Correo Electrónico"
                            rules={[{ required: true, message: "Por favor ingrese el correo electrónico" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="nombre"
                            label="Nombre"
                            rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="apellido"
                            label="Apellido"
                            rules={[{ required: true, message: "Por favor ingrese el apellido" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Contraseña"
                            rules={[{ required: true, message: "Por favor ingrese la contraseña" }]}
                        >
                            <Input.Password /> {/* Cambiar a Input.Password para ocultar la contraseña */}
                        </Form.Item>
                        <Form.Item
                            name="rol"
                            label="Rol"
                            rules={[{ required: true, message: "Por favor seleccione el rol" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Users;

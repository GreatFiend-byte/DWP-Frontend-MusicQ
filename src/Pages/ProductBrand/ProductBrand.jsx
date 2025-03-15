import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Checkbox from '../../ComponentsUI/Checkbox.jsx';
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { Input, Select, Slider } from "antd"; // Importa componentes de Ant Design
import guitarraImage from '../../assets/guitarra1.jpg'; // Importa las imágenes
import bateriaImage from '../../assets/bateria1.jpg';


const { Search } = Input;
const { Option } = Select;

const ProductBrand = () => {
    // Datos estáticos de 2 productos
    const productos = [
        {
            id: '1',
            nombre: 'Guitarra Acústica',
            descripcion: 'Una guitarra acústica de alta calidad, perfecta para principiantes y profesionales.',
            precio: 299.99,
            marca: 'Yamaha',
            imagen: guitarraImage, // Imagen de ejemplo
        },
        {
            id: '2',
            nombre: 'Batería Electrónica',
            descripcion: 'Batería electrónica con sonidos realistas y múltiples configuraciones.',
            precio: 599.99,
            marca: 'Yamaha',
            imagen: bateriaImage, // Imagen de ejemplo
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>Instrumentos Musicales Marca: Yamaha</Title>

                {/* Barra de Filtros (Hardcode) */}
                <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
                    {/* Barra de búsqueda */}
                    <Col xs={24} sm={12} md={6}>
                        <Search
                            placeholder="Buscar por nombre"
                            allowClear
                            enterButton
                            // onSearch={handleSearch} (Sin funcionalidad aún)
                        />
                    </Col>

                    {/* Filtro por tipo */}
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Filtrar por tipo"
                            style={{ width: "100%" }}
                            // onChange={handleTipoChange} (Sin funcionalidad aún)
                            allowClear
                        >
                            <Option value="guitarra">Guitarra</Option>
                            <Option value="bateria">Batería</Option>
                            <Option value="teclado">Teclado</Option>
                            {/* Agrega más opciones según sea necesario */}
                        </Select>
                    </Col>


                    {/* Filtro por precio */}
                    <Col xs={24} sm={12} md={6}>
                        <Slider
                            range
                            min={0}
                            max={1000}
                            defaultValue={[0, 1000]}
                            // onChange={handlePrecioChange} (Sin funcionalidad aún)
                            tipFormatter={(value) => `$${value}`}
                        />
                        <Paragraph style={{ textAlign: "center" }}>
                            Precio: $0 - $1000
                        </Paragraph>
                    </Col>

                    {/* Filtro por existencias */}
                    <Col xs={24} sm={12} md={6}>
                        <Checkbox
                            // onChange={handleStockChange} (Sin funcionalidad aún)
                        >
                            Solo en stock
                        </Checkbox>
                    </Col>
                </Row>

                {/* Lista de Instrumentos */}
                <Row gutter={[24, 24]} justify="start">
                    {productos.map((producto) => (
                        <Col 
                            key={producto.id} 
                            xs={24} sm={12} md={8} lg={6} // Ajusta el tamaño de las columnas
                        >
                            <Card 
                                cover={<img src={producto.imagen} alt={producto.nombre} style={{ height: "200px", objectFit: "cover" }} />}
                                style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                            >
                                <div>
                                    <Title level={4} style={{ whiteSpace: "normal" }}>{producto.nombre}</Title>
                                    <Paragraph>{producto.descripcion}</Paragraph>
                                    <Paragraph style={{ fontWeight: "bold" }}>Precio: ${producto.precio}</Paragraph>
                                    <Paragraph style={{ color: "#666" }}>Marca: {producto.marca}</Paragraph>
                                </div>
                                
                                {/* Botón con enlace fijo */}
                                <Link to="/product" style={{ textDecoration: 'none' }}>
                                    <Button 
                                        type="primary" 
                                        style={{ 
                                            backgroundColor: "#ff3b3b", 
                                            borderColor: "#ff3b3b", 
                                            width: "100%", 
                                            marginTop: "16px" 
                                        }}
                                    >
                                        Comprar
                                    </Button>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};

export default ProductBrand;
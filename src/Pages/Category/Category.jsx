import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Checkbox from '../../ComponentsUI/Checkbox.jsx';
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { Input, Select, Slider } from "antd";
import { getCategoriaById } from "../../services/productService.js";

const { Search } = Input;
const { Option } = Select;

const Category = () => {
    const { id } = useParams();
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        const fetchCategoria = async () => {
            const data = await getCategoriaById(id);
            setCategoria(data);
        };

        fetchCategoria();
    }, [id]);

    if (!categoria) {
        return <p>Cargando...</p>;
    }

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>{categoria.nombre}</Title>

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

                    {/* Filtro por marca */}
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="Filtrar por marca"
                            style={{ width: "100%" }}
                            // onChange={handleMarcaChange} (Sin funcionalidad aún)
                            allowClear
                        >
                            <Option value="fender">Fender</Option>
                            <Option value="yamaha">Yamaha</Option>
                            <Option value="roland">Roland</Option>
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
                    {categoria.instrumentos.map((instrumento) => (
                        <Col 
                            key={instrumento.id} 
                        >
                            <Card 
                                cover={<img src={instrumento.imagen} style={{ height: "200px", objectFit: "cover" }} />}
                                style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                            >
                                <div>
                                    <Title level={4} style={{ whiteSpace: "normal" }}>{instrumento.nombre}</Title>
                                    <Paragraph>{instrumento.descripcion}</Paragraph>
                                    <Paragraph style={{ fontWeight: "bold" }}>Precio: ${instrumento.precio}</Paragraph>
                                    <Paragraph style={{ color: "#666" }}>Marca: {instrumento.marca}</Paragraph>
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

export default Category;
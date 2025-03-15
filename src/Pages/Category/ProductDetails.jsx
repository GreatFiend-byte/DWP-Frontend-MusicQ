import React, { useState } from 'react';
import { Col, Image, InputNumber } from 'antd';
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import { useParams, Link } from "react-router-dom";



const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (value) => {
        if (value < 1) {
            setQuantity(1);
        } else if (value > 10) {
            setQuantity(10);
        } else {
            setQuantity(value);
        }
    };

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Image
                            src="/src/assets/bateria1.jpg"
                            alt="Nombre del Producto"
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={2}>Bateria</Title>
                        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
                            Bateria acustica de alta calidad con terminados finos.
                        </Paragraph>
                        <Paragraph style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Precio: $999.99
                        </Paragraph>
                        <Paragraph style={{ color: '#666' }}>Marca: Yamaha</Paragraph>
                        <Paragraph style={{ color: '#666' }}>Categoría: Percusiones</Paragraph>
                        <div style={{ marginTop: '16px' }}>
                            <Paragraph style={{ marginBottom: '8px' }}>Cantidad:</Paragraph>
                            <InputNumber
                                min={1}
                                max={10}
                                value={quantity}
                                onChange={handleQuantityChange}
                                style={{ width: '100px', marginRight: '16px' }}
                            />
                            <Link to="/car">
                                <Button type="primary" style={{ backgroundColor: "#ff3b3b", borderColor: "#ff3b3b" }}>
                                    Comprar
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: '40px' }}>
                    <Col span={24}>
                        <Title level={3}>Especificaciones Técnicas</Title>
                        <Paragraph style={{ color: '#666' }}>
                            Aquí puedes incluir las especificaciones técnicas del producto. Este es un texto de ejemplo para las especificaciones.
                        </Paragraph>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ProductDetail;
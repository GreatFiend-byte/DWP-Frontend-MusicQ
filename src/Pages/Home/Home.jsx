import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Row from "../../ComponentsUI/Row.jsx";
import Col from "../../ComponentsUI/Col.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { getCategorias } from "../../services/productService";

const Home = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const data = await getCategorias();
            setCategorias(data);
        };

        fetchCategorias();
    }, []);

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Card
                    cover={<img src="src/assets/banner1.jpg" style={{ height: "300px", objectFit: "cover" }} />}
                    style={{ marginBottom: "32px" }}
                >
                    <Title level={3}>Catálogo de Instrumentos</Title>
                    <Paragraph style={{ color: "#666" }}>
                        Contamos con variedades de diferentes categorías y marcas de Instrumentos Musicales...
                    </Paragraph>
                    <Link to="/catalog">
                        <Button type="primary" style={{ backgroundColor: "#ff3b3b", borderColor: "#ff3b3b" }}>
                            Explorar
                        </Button>
                    </Link>
                </Card>

                <Row gutter={[24, 24]}>
                    {categorias.map((categoria) => (
                        <Col key={categoria.id} xs={24} sm={12} md={6}>
                            <Card
                                cover={<img src={categoria.imagen} style={{ height: "150px", objectFit: "cover" }} />}
                            >
                                <Title level={4}>{categoria.nombre}</Title>
                                <Paragraph style={{ color: "#666" }}>Instrumentos de {categoria.nombre.toLowerCase()}.</Paragraph>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <Link to={`/category/${categoria.id}`}>
                                        <Button type="primary" style={{ backgroundColor: "#ff3b3b", borderColor: "#ff3b3b" }}>
                                            Ir categoría
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div style={{ marginTop: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <Card
            cover={<img
              src="src/assets/piano.jpg"
              style={{ height: '200px', objectFit: 'cover' }}
            />}
            style={{ flex: '1 1 400px' }}
          >
            <Title level={3}>Acerca de nosotros...</Title>
            <Paragraph style={{ color: '#666' }}>
            MusicQ nace en 2021 creando un negocio diferente dentro del mercado de instrumentos musicales en Mexico...
            </Paragraph>
            <Link to="/aboutus"><Button type="primary" style={{ backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}>Ver</Button></Link>
          </Card>

          <Card
            cover={<img
              src="src/assets/novedades.jpg"
              style={{ height: '200px', objectFit: 'cover' }}
            />}
            style={{ flex: '1 1 400px' }}
          >
            <Title level={3}>Novedades</Title>
            <Paragraph style={{ color: '#666' }}>
            Enterate de todo lo nuevo, ofertas, promociones y más...
            </Paragraph>
            <Link to="/news"><Button type="primary" style={{ backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}>Ver</Button></Link>
          </Card>
        </div>
            </Content>
        </Layout>
    );
};

export default Home;

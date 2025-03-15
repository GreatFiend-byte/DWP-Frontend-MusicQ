import React from "react";
import { Col, Form, Input } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Button from "../../ComponentsUI/Button.jsx";
import Row from '../../ComponentsUI/Row';
import Typography, { Title, Paragraph, Text } from "../../ComponentsUI/Typography.jsx";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";


const { TextArea } = Input;

const ContactUs = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Valores del formulario:", values);
        form.resetFields();
    };

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Contáctanos
                </Title>

                {/* Sección de Información de Contacto y Mapa */}
                <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
                    {/* Información de Contacto */}
                    <Col xs={24} md={12}>
                        <Title level={4}>Información de Contacto</Title>
                        <Paragraph>
                            <EnvironmentOutlined style={{ marginRight: "8px" }} />
                            Dirección: Calle Falsa 123, Ciudad, País
                        </Paragraph>
                        <Paragraph>
                            <PhoneOutlined style={{ marginRight: "8px" }} />
                            Teléfono: +1 234 567 890
                        </Paragraph>
                        <Paragraph>
                            <MailOutlined style={{ marginRight: "8px" }} />
                            Email: contacto@tiendainstrumentos.com
                        </Paragraph>
                    </Col>

                    {/* Mapa Interactivo (Google Maps) */}
                    <Col xs={24} md={12}>
                        <div style={{ width: "100%", height: "300px", borderRadius: "8px", overflow: "hidden" }}>
                            <iframe
                                title="Ubicación de la tienda"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.381036614949!2d-100.40734336489406!3d20.657878165212775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzI4LjQiTiAxMDDCsDI0JzI2LjQiVw!5e0!3m2!1ses!2smx!4v1696890000000!5m2!1ses!2smx"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div> 
                    </Col>
                </Row>

                {/* Formulario de Contacto */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12} style={{ margin: "0 auto" }}>
                        <Title level={4}>Envíanos un Mensaje</Title>
                        <Form form={form} onFinish={handleSubmit}>
                            {/* Campo para el nombre */}
                            <Form.Item
                                name="nombre"
                                rules={[{ required: true, message: "Por favor, ingresa tu nombre" }]}
                            >
                                <Input placeholder="Nombre" />
                            </Form.Item>

                            {/* Campo para el correo electrónico */}
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Por favor, ingresa tu correo electrónico" },
                                    { type: "email", message: "Ingresa un correo electrónico válido" },
                                ]}
                            >
                                <Input placeholder="Correo Electrónico" />
                            </Form.Item>

                            {/* Campo para el asunto */}
                            <Form.Item
                                name="asunto"
                                rules={[{ required: true, message: "Por favor, ingresa un asunto" }]}
                            >
                                <Input placeholder="Asunto" />
                            </Form.Item>

                            {/* Campo para el mensaje */}
                            <Form.Item
                                name="mensaje"
                                rules={[{ required: true, message: "Por favor, ingresa tu mensaje" }]}
                            >
                                <TextArea rows={6} placeholder="Mensaje" />
                            </Form.Item>

                            {/* Botón de enviar */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Enviar Mensaje
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ContactUs;
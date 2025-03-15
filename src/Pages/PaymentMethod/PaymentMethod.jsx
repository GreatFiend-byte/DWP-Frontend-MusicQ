import React from "react";
import { Row, Col, Form, Input, Radio, Divider } from "antd";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import { CreditCardOutlined, BankOutlined, DollarOutlined } from "@ant-design/icons";



const PaymentMethod = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Valores del formulario:", values);
        // Aquí puedes agregar la lógica para procesar el pago
    };

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Título de la página */}
                <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Forma de Pago
                </Title>

                {/* Resumen del Pedido */}
                <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
                    <Col xs={24} md={12}>
                        <Title level={4}>Resumen del Pedido</Title>
                        <Card>
                            <Paragraph>
                                <strong>Producto:</strong> Guitarra Acústica
                            </Paragraph>
                            <Paragraph>
                                <strong>Cantidad:</strong> 1
                            </Paragraph>
                            <Paragraph>
                                <strong>Subtotal:</strong> $299.99
                            </Paragraph>
                            <Paragraph>
                                <strong>Envío:</strong> $15.00
                            </Paragraph>
                            <Divider />
                            <Paragraph style={{ fontWeight: "bold" }}>
                                <strong>Total:</strong> $314.99
                            </Paragraph>
                        </Card>
                    </Col>

                    {/* Opciones de Pago */}
                    <Col xs={24} md={12}>
                        <Title level={4}>Opciones de Pago</Title>
                        <Card>
                            <Form form={form} onFinish={handleSubmit}>
                                {/* Método de Pago */}
                                <Form.Item
                                    name="metodoPago"
                                    rules={[{ required: true, message: "Selecciona un método de pago" }]}
                                >
                                    <Radio.Group>
                                        <Radio value="tarjeta">
                                            <CreditCardOutlined style={{ marginRight: "8px" }} />
                                            Tarjeta de Crédito/Débito
                                        </Radio>
                                        <Radio value="transferencia">
                                            <BankOutlined style={{ marginRight: "8px" }} />
                                            Transferencia Bancaria
                                        </Radio>
                                        <Radio value="efectivo">
                                            <DollarOutlined style={{ marginRight: "8px" }} />
                                            Efectivo al Recibir
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                {/* Detalles de la Tarjeta (condicional) */}
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) =>
                                        prevValues.metodoPago !== currentValues.metodoPago
                                    }
                                >
                                    {({ getFieldValue }) =>
                                        getFieldValue("metodoPago") === "tarjeta" ? (
                                            <>
                                                <Form.Item
                                                    name="numeroTarjeta"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Ingresa el número de tarjeta",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Número de Tarjeta" />
                                                </Form.Item>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={12}>
                                                        <Form.Item
                                                            name="fechaExpiracion"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Ingresa la fecha de expiración",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="MM/AA" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <Form.Item
                                                            name="cvv"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Ingresa el CVV",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="CVV" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null
                                    }
                                </Form.Item>

                                {/* Botón de Confirmar Pago */}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: "100%", marginTop: "16px" }}
                                    >
                                        Confirmar Pago
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>

                {/* Detalles de Envío */}
                <Row gutter={[24, 24]}>
                    <Col xs={24}>
                        <Title level={4}>Detalles de Envío</Title>
                        <Card>
                            <Paragraph>
                                <strong>Dirección:</strong> Calle Falsa 123, Ciudad, País
                            </Paragraph>
                            <Paragraph>
                                <strong>Método de Envío:</strong> Estándar (3-5 días hábiles)
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default PaymentMethod;
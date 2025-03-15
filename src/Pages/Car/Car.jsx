import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Table, InputNumber } from 'antd';
import Card from "../../ComponentsUI/Card.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Row from '../../ComponentsUI/Row';
import Typography, { Title, Paragraph, Text } from "../../ComponentsUI/Typography.jsx";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import { DeleteOutlined } from '@ant-design/icons';
import guitarraImage from '../../assets/guitarra1.jpg';
import bateriaImage from '../../assets/bateria1.jpg';
import pianoImage from '../../assets/piano1.jpg';



const Car = () => {
    const [cartItems, setCartItems] = useState([
        {
            key: '1',
            name: 'Guitarra Acústica',
            price: 299.99,
            quantity: 1,
            image: guitarraImage,
        },
        {
            key: '2',
            name: 'Batería Electrónica',
            price: 599.99,
            quantity: 1,
            image: bateriaImage,
        },
        {
            key: '3',
            name: 'Teclado Digital',
            price: 399.99,
            quantity: 1,
            image: pianoImage,
        },
    ]);

    const handleQuantityChange = (key, value) => {
        const updatedItems = cartItems.map((item) =>
            item.key === key ? { ...item, quantity: value } : item
        );
        setCartItems(updatedItems);
    };

    const handleRemoveItem = (key) => {
        const updatedItems = cartItems.filter((item) => item.key !== key);
        setCartItems(updatedItems);
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: '50px', height: '50px', marginRight: '16px' }}
                    />
                    <Text>{text}</Text>
                </div>
            ),
        },
        {
            title: 'Precio Unitario',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Text>${price.toFixed(2)}</Text>,
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(value) => handleQuantityChange(record.key, value)}
                />
            ),
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render: (_, record) => (
                <Text>${(record.price * record.quantity).toFixed(2)}</Text>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(record.key)}
                />
            ),
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>Carrito de Compras</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={18}>
                        <Table
                            columns={columns}
                            dataSource={cartItems}
                            pagination={false}
                            rowKey="key"
                        />
                    </Col>
                    <Col xs={24} md={6}>
                        <Card title="Resumen de la Compra" style={{ width: '100%' }}>
                            <Text strong>Total: ${total.toFixed(2)}</Text>
                            <Link to="/payment">
                                <Button
                                    type="primary"
                                    style={{ width: '100%', marginTop: '16px', backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}
                                >
                                    Proceder al Pago
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Car;
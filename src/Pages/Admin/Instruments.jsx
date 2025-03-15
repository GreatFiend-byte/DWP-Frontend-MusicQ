import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Form, Upload } from "antd";
import Layout, { Content } from "../../ComponentsUI/Layout.jsx";
import Button from "../../ComponentsUI/Button.jsx";
import Typography, { Title, Paragraph } from "../../ComponentsUI/Typography.jsx";
import { editInstrument, deleteInstrument, getInstrumentsyCategories, addInstrument } from "../../services/adminService.js";
import { UploadOutlined } from '@ant-design/icons';


const Instruments = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentInstrument, setCurrentInstrument] = useState(null);
    const [form] = Form.useForm();
    const [isAdding, setIsAdding] = useState(false); // Nuevo estado para diferenciar agregar/editar
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        const fetchCategoriesWithInstruments = async () => {
            try {
                const response = await getInstrumentsyCategories();
                if (response && Array.isArray(response)) {
                    setCategories(response);
                }
            } catch (error) {
                console.error("Error al obtener categorías e instrumentos:", error);
            }
        };
        fetchCategoriesWithInstruments();
    }, []);

    const handleDelete = async (instrumentId, categoryId) => {
        try {
            await deleteInstrument(categoryId, instrumentId);
            setCategories(categories.map(category => ({
                ...category,
                instrumentos: category.instrumentos.filter(instrument => instrument.id !== instrumentId)
            })));
        } catch (error) {
            console.error("Error al eliminar instrumento:", error);
        }
    };

    const handleEdit = (instrument, categoryId) => {
        setIsAdding(false); // Estamos editando, no agregando
        setCurrentInstrument({ ...instrument, categoryId });
        form.setFieldsValue({
            nombre: instrument.nombre,
            descripcion: instrument.descripcion,
            marca: instrument.marca,
            precio: instrument.precio,
            imagen: instrument.imagen, // Imagen no es un campo de texto ahora
        });
        setIsModalVisible(true);
    };

    const handleAddInstrument = (categoryId) => {
        setIsAdding(true); // Indicamos que es una alta nueva
        setCurrentInstrument({ categoryId }); // Guardamos la categoría seleccionada
        form.resetFields(); // Limpiar formulario
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (isAdding) {
                // Agregar un nuevo instrumento
                const newInstrument = await addInstrument(currentInstrument.categoryId, values);
                setCategories(categories.map(category => (
                    category.id === currentInstrument.categoryId
                        ? { ...category, instrumentos: [...category.instrumentos, newInstrument] }
                        : category
                )));
            } else {
                // Editar instrumento existente
                await editInstrument(currentInstrument.categoryId, currentInstrument.id, values);
                setCategories(categories.map(category => ({
                    ...category,
                    instrumentos: category.instrumentos.map(instrument =>
                        instrument.id === currentInstrument.id ? { ...instrument, ...values } : instrument
                    )
                })));
            }

            setIsModalVisible(false);
        } catch (error) {
            console.error("Error al guardar instrumento:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file); // Agrega el archivo de imagen al FormData

        try {
            const response = await fetch('http://localhost:5001/upload', { // Cambia esta URL a tu backend
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            form.setFieldsValue({ imagen: data.imageUrl }); // Guarda la URL de la imagen en el formulario
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    const columns = [
        { title: "Nombre", dataIndex: "nombre", key: "nombre", width: "20%" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion", width: "25%" },
        { title: "Marca", dataIndex: "marca", key: "marca", width: "20%" },
        { title: "Precio", dataIndex: "precio", key: "precio", width: "15%" },
        {
            title: "Imagen",
            dataIndex: "imagen",
            key: "imagen",
            render: (imageUrl) => <img src={imageUrl} alt="Instrumento" style={{ width: 50, height: 50, objectFit: "cover" }} />,
            width: "10%",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, instrumento) => (
                <p>
                    <Button type="success" onClick={() => handleEdit(instrumento, instrumento.categoryId)} style={{ backgroundColor: "00bdff", borderColor: "#00bdff" }} >Editar</Button>
                    <Button type="primary" onClick={() => handleDelete(instrumento.id, instrumento.categoryId)} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}>Eliminar</Button>
                </p>
            ),
            width: "10%",
        },
    ];

    return (
        <Layout style={{ backgroundColor: "#fff" }}>
            <Content style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <Title level={2}>Administrar Instrumentos</Title>

                {categories.map(category => (
                    <div key={category.id} style={{ marginBottom: "30px" }}>
                        <Title level={3}>{category.nombre}</Title>
                        <Button type="primary" onClick={() => handleAddInstrument(category.id)} style={{ marginBottom: "10px" }}>
                            Agregar Instrumento
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={category.instrumentos}
                            rowKey={(record) => record.id}
                            pagination={false}
                        />
                    </div>
                ))}

                {/* Modal para agregar/editar instrumentos */}
                <Modal
                    title={isAdding ? "Agregar Instrumento" : "Editar Instrumento"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Guardar"
                    cancelText="Cancelar"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre del instrumento" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese la descripción" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="marca" label="Marca" rules={[{ required: true, message: "Ingrese la marca" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="precio" label="Precio" rules={[{ required: true, message: "Ingrese el precio" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="imagen" label="Imagen">
                            <Upload
                                customRequest={({ file, onSuccess }) => {
                                    handleImageUpload(file);
                                    onSuccess("ok"); // Marca la subida como exitosa
                                }}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Instruments;


import React, { useContext } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../ComponentsUI/Button.jsx';
import Checkbox from '../../../ComponentsUI/Checkbox.jsx';
import { loginUser } from '../../../services/authService';
import { AuthContext } from '../../../../context/AuthContext';

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const { username, password } = values;
      const user = await loginUser(username, password);

      login(user);

      message.success('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || 'Error al iniciar sesión');
      } else if (error.request) {
        message.error('No se recibió respuesta del servidor');
      } else {
        message.error('Error al configurar la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '0px',
      minHeight: '0vh',
      backgroundColor: '#fff'
    }}>
      <div style={{
        backgroundColor: '#000',
        width: '350px',
        padding: '30px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '24px' }}>Login</h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ textAlign: 'left' }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Por favor ingresa tu nombre de usuario' }
            ]}
          >
            <Input
              placeholder="Nombre de usuario"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña' }
            ]}
          >
            <Input.Password
              placeholder="Password"
              style={{ borderRadius: '4px' }}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '12px' }}>
            <Checkbox style={{ color: '#fff' }}>Recordarme</Checkbox>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <Button style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}>
              <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                Registar
              </Link>
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ flex: 1, backgroundColor: '#333', borderColor: '#333' }}
              loading={loading}
            >
              Iniciar Sesion
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
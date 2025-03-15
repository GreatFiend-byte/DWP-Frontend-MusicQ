import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LogoEmpresa from '../assets/Logo_Empresa.png';
import Button from '../ComponentsUI/Button.jsx';
import { AuthContext } from '../../context/AuthContext';
import { getCategorias } from '../services/productService';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const menuCategorias = (
    <Menu>
      {categorias.map((categoria) => (
        <Menu.Item key={categoria.id}>
          <Link to={`/category/${categoria.id}`}>{categoria.nombre}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );


  const menuMarcas = (
    <Menu>
      <Menu.Item key="1"><Link to="/product/brand">Yamaha</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/product/brand">Fender</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/product/brand">Gibson</Link></Menu.Item>
    </Menu>
  );

  const menuAdministrar = (
    <Menu>
      <Menu.Item key="1"><Link to="/admin/users">Usuarios</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/admin/instruments">Instrumentos</Link></Menu.Item>
    </Menu>
  );

  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
          <img 
            src={LogoEmpresa} 
            alt="MusicQ - Instrumentos Musicales" 
            style={{ height: '60px' }} 
          />
        </Link>
      </div>
      
      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Dropdown overlay={menuCategorias}>
          <Button type="text">Categorías <DownOutlined /></Button>
        </Dropdown>

        <Button type="text">
          <Link to="/car" style={{ color: '#000', textDecoration: 'none' }}>
            Carrito de Compras
          </Link>
        </Button>


        <Dropdown overlay={menuMarcas}>
          <Button type="text">Marcas <DownOutlined /></Button>
        </Dropdown>

        {isLoggedIn && user?.rol === 'admin' && (
          <Dropdown overlay={menuAdministrar}>
            <Button type="text">Administrar <DownOutlined /></Button>
          </Dropdown>
        )}

        <Button type="text">
          <Link to="/contact" style={{ color: '#000', textDecoration: 'none' }}>
            Contáctanos
          </Link>
        </Button>

        {!isLoggedIn ? (
          <>
            <Button type="text">
              <Link to="/login" style={{ color: '#000', textDecoration: 'none' }}>
                Inicio de sesión
              </Link>
            </Button>
            <Button type="text">
              <Link to="/register" style={{ color: '#000', textDecoration: 'none' }}>
                Registrarse
              </Link>
            </Button>
          </>
        ) : (
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="1">
                <Link to="/perfil">Mi Perfil</Link>
              </Menu.Item>
              <Menu.Item key="2" onClick={logout}>Cerrar Sesión</Menu.Item>
            </Menu>
          }>
            <Button type="text">
              {user?.nombre || user?.username} <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </nav>
    </header>
  );
};

export default Header;

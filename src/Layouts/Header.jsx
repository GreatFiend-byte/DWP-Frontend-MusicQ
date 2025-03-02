import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LogoEmpresa from '../assets/Logo_Empresa.png';
import Button from '../ComponentsUI/Button.jsx';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const menuCategorias = (
    <Menu>
      <Menu.Item key="1"><Link to="/categorias/guitarras">Guitarras</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/categorias/pianos">Pianos</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/categorias/percusion">Percusión</Link></Menu.Item>
    </Menu>
  );

  const menuInstrumentos = (
    <Menu>
      <Menu.Item key="1"><Link to="/instrumentos/cuerda">Cuerda</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/instrumentos/viento">Viento</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/instrumentos/percusion">Percusión</Link></Menu.Item>
    </Menu>
  );

  const menuMarcas = (
    <Menu>
      <Menu.Item key="1"><Link to="/marcas/yamaha">Yamaha</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/marcas/fender">Fender</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/marcas/gibson">Gibson</Link></Menu.Item>
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
        
        <Dropdown overlay={menuInstrumentos}>
          <Button type="text">Instrumentos <DownOutlined /></Button>
        </Dropdown>

        <Dropdown overlay={menuMarcas}>
          <Button type="text">Marcas <DownOutlined /></Button>
        </Dropdown>

        <Button type="text">
          <Link to="/contacto" style={{ color: '#000', textDecoration: 'none' }}>
            Contáctanos
          </Link>
        </Button>

        {!isLoggedIn && (
          <>
            <Button type="text">
              <Link to="/login" style={{ color: '#000', textDecoration: 'none' }}>
                Inicio de sesión
              </Link>
            </Button>
            <Button type="text">
              <Link to="/register" style={{ color: '#000', textDecoration: 'none' }}>
                Registar
              </Link>
            </Button>
          </>
        )}

        {isLoggedIn && (
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
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '16px',
      backgroundColor: '#f0f2f5',
      marginTop: '40px',
      borderTop: '1px solid #eaeaea'
    }}>
      <p style={{ margin: 0, color: '#666' }}>
        © 2025, (Empresas), Inc. (Empresas), el logo de (Empresas), (Pagina), 
        son marcas comerciales o marcas registradas de (Empresas), Inc. en los 
        Estados Unidos Mexicanos y en otros lugares. Todos los derechos reservados.
      </p>
      <p style={{ margin: '8px 0 0', color: '#666' }}>
        <a href="/terminos" style={{ color: '#1890ff' }}>Términos de servicio</a> |{' '}
        <a href="/privacidad" style={{ color: '#1890ff' }}>Política de Privacidad</a> |{' '}
        <a href="/seguridad" style={{ color: '#1890ff' }}>Seguridad y Protección</a>
      </p>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Layout, { Content } from '../../ComponentsUI/Layout.jsx';
import Card from '../../ComponentsUI/Card.jsx';
import Row from '../../ComponentsUI/Row.jsx';
import Col from '../../ComponentsUI/Col.jsx';
import Button from '../../ComponentsUI/Button.jsx';
import Typography, { Title, Paragraph } from '../../ComponentsUI/Typography.jsx';

const Home = () => {
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Content style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Card
          cover={<div style={{ backgroundColor: '#ccc', height: '300px' }} />} 
          style={{ marginBottom: '32px' }}
        >
          <Title level={3}>Kangaroo Valley Safari</Title>
          <Paragraph style={{ color: '#666' }}>
            Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
          </Paragraph>
          <Button type="primary" style={{ backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}>
            EXPLORE
          </Button>
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card 
              cover={<div style={{ backgroundColor: '#ccc', height: '150px' }} />}
            >
              <Title level={4}>Title</Title>
              <Paragraph style={{ color: '#666' }}>Some description here.</Paragraph>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button>❤️</Button>
                <Button>🔖</Button>
                <Button>🔗</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              cover={<div style={{ backgroundColor: '#ccc', height: '150px' }} />}
            >
              <Title level={4}>Title</Title>
              <Paragraph style={{ color: '#666' }}>Some description here.</Paragraph>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button>❤️</Button>
                <Button>🔖</Button>
                <Button>🔗</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              cover={<div style={{ backgroundColor: '#ccc', height: '150px' }} />}
            >
              <Title level={4}>Title</Title>
              <Paragraph style={{ color: '#666' }}>Some description here.</Paragraph>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button>❤️</Button>
                <Button>🔖</Button>
                <Button>🔗</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card 
              cover={<div style={{ backgroundColor: '#ccc', height: '150px' }} />}
            >
              <Title level={4}>Title</Title>
              <Paragraph style={{ color: '#666' }}>Some description here.</Paragraph>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button>❤️</Button>
                <Button>🔖</Button>
                <Button>🔗</Button>
              </div>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <Card
            cover={<div style={{ backgroundColor: '#ccc', height: '200px' }} />}
            style={{ flex: '1 1 400px' }}
          >
            <Title level={3}>Kangaroo Valley Safari</Title>
            <Paragraph style={{ color: '#666' }}>
              Located two hours south of Sydney in the Southern Highlands of New South Wales, ...
            </Paragraph>
            <Button type="primary" style={{ backgroundColor: '#ff3b3b', borderColor: '#ff3b3b' }}>
              EXPLORE
            </Button>
          </Card>
          <div style={{ flex: '1 1 400px' }}>
            <Title level={2} style={{ color: '#ff3b3b' }}>Lorem Ipsum</Title>
            <Paragraph style={{ color: '#666', lineHeight: '1.6' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
            </Paragraph>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

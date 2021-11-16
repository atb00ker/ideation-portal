import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { FeatureDisplayType } from '../../types/react-component-input';

const FeatureDisplayWhite: React.FC<FeatureDisplayType> = ({ image, title, description, imageWidth }) => {
  return (
    <Row className='cover-screen'>
      <Col sm='12'>
        <Container className='h-100 max-width-960'>
          <Row className='h-100'>
            <Col xs='12' md='4'>
              <div className='cover-screen-flex'>
                <Row>
                  <Col xs='12'>
                    <h2 className='text-primary'>{title}</h2>
                  </Col>
                  <Col xs='12'>{description}</Col>
                </Row>
              </div>
            </Col>
            <Col
              className='cover-screen-flex'
              xs={{ order: 'first', span: '12' }}
              md={{ order: 'last', span: '8' }}>
              <Image
                className='d-none d-md-block cover-screen-flex'
                src={image}
                alt={title}
                width={imageWidth}
              />
              <Image className='d-md-none cover-screen-flex' src={image} alt={title} width={'100%'} />{' '}
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export { FeatureDisplayWhite };

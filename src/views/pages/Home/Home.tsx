import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmptyInformationDashboard3 from '../../assets/illustrations/no-records-found-1.svg';
import SocialNotification1 from '../../assets/illustrations/social-notifications-1.svg';
import Search1 from '../../assets/illustrations/search-1.svg';
import Reports1 from '../../assets/illustrations/reports-1.svg';
import SteppingToFuture from '../../assets/illustrations/stepping-to-future-1.svg';
import { IAuth } from '../../interfaces/IAuth';
import { AuthContext } from '../../components/Auth/AuthProvider';
import Button from 'react-bootstrap/esm/Button';
import { FeatureDisplayOffWhite } from './FeatureDisplayOffWhite';
import { FeatureDisplayWhite } from './FeatureDisplayWhite';
import './Home.scss';
import { RouterPath } from '../../enums/RouterPath';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const auth: IAuth = useContext(AuthContext);
  return (
    <Container className='overflow-hidden' fluid>
      <Row className='cover-screen'>
        <Col sm='12' className='d-flex-center'>
          <Container className='d-flex-center'>
            <Row className='d-flex-center'>
              <Col sm='12' className='text-center-md mt-4 max-width-960'>
                <h1>
                  Ideate. Discuss. Achieve.
                </h1>
                {auth.isReady && !auth.isAuthenticated && (
                  <Button
                    data-testid='features-page-button'
                    onClick={() => auth.loginWithRedirect()}
                    className='d-inline'
                    variant='primary'>
                    Sign Up
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <FeatureDisplayOffWhite
        image={EmptyInformationDashboard3}
        imageWidth={'300px'}
        title='Share Ideas'
        description='Got an Idea to improve a process or innovate? Share it with everyone!'
      />
      <FeatureDisplayWhite
        image={Search1}
        imageWidth={'550px'}
        title='Search what matters to you...'
        description='Search for ideas within your department, your category of interest or globally!'
      />
      <FeatureDisplayOffWhite
        image={SocialNotification1}
        imageWidth={'550px'}
        title='Socialize'
        description="Comment, like, discuss and contribute to the projects that interest you."
      />
      <FeatureDisplayWhite
        image={Reports1}
        imageWidth={'550px'}
        title='Reports'
        description="See the big big picture of how we are ideating and innovating as a whole."
      />
      <FeatureDisplayOffWhite
        image={SteppingToFuture}
        imageWidth={'650px'}
        title='Track Progress'
        description='Checkout the status of the projects matter to you, from idea being proposed to being completed.'
      />
      <Row className='cover-screen'>
        <Col sm='12' className='d-flex-center'>
          <Container className='d-flex-center'>
            <Row>
              <Col sm='12' className='d-flex-center max-width-960'>
                <h1>Much more...</h1>
              </Col>
              <Col sm='12' className='d-flex-center text-center max-width-960'>
                <h5>
                  Find more information and sources about the idea. Findout who proposed the idea...<br />
                  So, what are you waiting for?
                  <br />
                  <Link to={RouterPath.Topic}>
                    <Button className='mt-3 m-1 btn-sm' variant='primary'>
                      Get started!
                    </Button>
                  </Link>
                </h5>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

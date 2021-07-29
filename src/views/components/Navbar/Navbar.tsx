import React from 'react';
import { default as BootstrapNav } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';

const Navbar = () => {
  const auth: IAuth = React.useContext(AuthContext);
  console.log(auth?.isAuthenticated);
  console.log(auth?.isReady);
  console.log(auth?.user?.name);

  return (
    <React.Fragment>
      <BootstrapNav bg="light" expand="lg">
        <Container>
          <BootstrapNav.Brand href="#home">Ideation Portal</BootstrapNav.Brand>
          <BootstrapNav.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNav.Collapse id="basic-navbar-nav">
            <Link to={'/'}><Button className="m-1" variant="primary">Ideas</Button></Link>
            {!auth.isAuthenticated && <Button className="m-1" variant="primary" onClick={() => auth.loginWithRedirect()}>Login</Button>}
            {auth.isAuthenticated && <Button className="m-1" variant="danger" onClick={() => auth.logout({ returnTo: window.location.origin })}>Logout</Button>}
          </BootstrapNav.Collapse>
        </Container>
      </BootstrapNav>
    </React.Fragment>
  );
};

export default Navbar;

import React from 'react';
import { default as BootstrapNav } from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <BootstrapNav bg="light" expand="lg">
        <Container>
          <BootstrapNav.Brand href="#home">Ideation Portal</BootstrapNav.Brand>
          <BootstrapNav.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNav.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={'/'}><Button variant="primary" color="">Ideas</Button></Link>
            </Nav>
          </BootstrapNav.Collapse>
        </Container>
      </BootstrapNav>
    </React.Fragment>
  );
};

export default Navbar;

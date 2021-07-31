import React from 'react';
import { default as BootstrapNav } from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';

const Navbar = () => {
  // let { isLoading } = useAuth0();
  const auth: IAuth = React.useContext(AuthContext);

  return (
    <React.Fragment>
      <BootstrapNav bg="light" expand="sm">
        <Container fluid>
          <BootstrapNav.Brand href="#home">Ideation Portal</BootstrapNav.Brand>
          <BootstrapNav.Toggle aria-controls="navbar-toggle" />
          <BootstrapNav.Collapse id="navbar-toggle">
            <div style={{ flex: "1 1 auto" }}></div>
            {!auth.isReady &&
              <Button className="m-1 me-4 btn-sm" variant="primary"
                disabled onClick={() => auth.loginWithRedirect()}>Loading</Button>}
            {auth.isReady && !auth.isAuthenticated &&
              <Button className="m-1 me-4 btn-sm" variant="primary"
                onClick={() => auth.loginWithRedirect()}>Login</Button>}
            {auth.isReady && auth.isAuthenticated && <Button className="m-1 me-4 btn-sm" variant="danger"
              onClick={() => auth.logout({ returnTo: window.location.origin })}>Logout</Button>}
          </BootstrapNav.Collapse>
        </Container>
      </BootstrapNav>
    </React.Fragment>
  );
};

export default Navbar;

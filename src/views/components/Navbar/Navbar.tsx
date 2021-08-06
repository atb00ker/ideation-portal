import React, { useContext, useMemo, useState } from 'react';
import { default as BootstrapNav } from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../Auth/AuthProvider';
import { IAuth } from '../../interfaces/IAuth';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../enums/RouterPath';
import UpdatePageVisited from '../../graphql/UpdatePageVisited';

const Navbar = () => {
  const auth: IAuth = useContext(AuthContext);
  const { updatePageVisited } = UpdatePageVisited();
  useState(() => updatePageVisited());

  return (
    <React.Fragment>
      <BootstrapNav bg='light' expand='sm'>
        <Container fluid>
          <BootstrapNav.Brand href='#home'>Ideation Portal</BootstrapNav.Brand>
          <BootstrapNav.Toggle aria-controls='navbar-toggle' />
          <BootstrapNav.Collapse id='navbar-toggle'>
            <Link to={RouterPath.Home}>
              <Button className='m-1 btn-sm' variant='primary'>
                Home
              </Button>
            </Link>
            <Link to={RouterPath.Reports}>
              <Button className='m-1 btn-sm' variant='primary'>
                Reports
              </Button>
            </Link>
            <div style={{ flex: '1 1 auto' }}></div>
            {!auth.isReady && (
              <Button
                className='m-1 me-4 btn-sm'
                variant='primary'
                disabled
                onClick={() => auth.loginWithRedirect()}>
                Loading
              </Button>
            )}
            {auth.isReady && !auth.isAuthenticated && (
              <Button className='m-1 me-4 btn-sm' variant='primary' onClick={() => auth.loginWithRedirect()}>
                Login
              </Button>
            )}
            {auth.isReady && auth.isAuthenticated && (
              <Button
                className='m-1 me-4 btn-sm'
                variant='danger'
                onClick={() => auth.logout({ returnTo: window.location.origin })}>
                Logout
              </Button>
            )}
          </BootstrapNav.Collapse>
        </Container>
      </BootstrapNav>
    </React.Fragment>
  );
};

export default Navbar;

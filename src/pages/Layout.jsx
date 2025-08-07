import { Outlet } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Layout() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Customer Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to='/'>
                <Nav.Link>Packages</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/orders'>
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/pickups'>
                <Nav.Link>Pickups</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <br/>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
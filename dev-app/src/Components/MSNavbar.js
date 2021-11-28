import React from 'react';
import {Nav, Container, NavDropdown, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
    <Navbar.Brand href="/">Homepage</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <NavDropdown title="Mainstreets" id="basic-nav-dropdown">
            <NavDropdown.Item href="/brighton">Brighton</NavDropdown.Item>
            <NavDropdown.Item href="/chinatown">Chinatown</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="brighton">Business</Nav.Link>
        <Nav.Link href="brighton/employment">Employment</Nav.Link>
        <Nav.Link href="brighton/spending">Mobility and Spending</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
  );
}
export default NavigationBar;
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './NavBar.css'

const NavBar = props => {
  console.log(props.isLoggedIn);
  return (

    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">BodyTrack</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav>
          <NavItem componentClass={Link} href="/dash" to="/dash">
            Dashboard
          </NavItem>
          <NavItem componentClass={Link} href="/home" to="/home">
            Home
          </NavItem>
        </Nav>
        <Nav pullRight>
          {!props.isLoggedIn && (
            <NavItem componentClass={Link} href="/register" to="/register">
              Register
            </NavItem>
          )}
          {props.isLoggedIn ? (
            <NavItem onClick={props.handleLogout} componentClass={Link} href="#" to="#">
              Logout
            </NavItem>
          ) : (
            <NavItem componentClass={Link} href="/login" to="/login">
              Login
            </NavItem>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const NavBar = props => {
  console.log(props.isLoggedIn);
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/home">BodyTrack</a>
        </Navbar.Brand>
      </Navbar.Header>

      <Nav>
        <NavItem componentClass={Link} href="/dash" to="/dash">
          Dashboard
        </NavItem>
        <NavItem componentClass={Link} href="/home" to="/home">
          Home
        </NavItem>

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
    </Navbar>
  );
};

export default NavBar;

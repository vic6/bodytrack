import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = props => {
  console.log(props.isLoggedIn);
  return (
    <div className="nav">
      <Link to="/dash">Dashboard</Link>
      <Link to="/home">Home</Link>
      {!props.isLoggedIn && <Link to="/register">Register</Link>}
      {props.isLoggedIn ? (
        <Link to="#" onClick={props.handleLogout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default NavBar;

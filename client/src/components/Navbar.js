import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Navbar = props => {
  const logout = () => {
    axios.delete("/api/auth/logout").then(() => {
      props.setUser(null);
    });
  };

  if (props.user) {
    return (
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <Link className="navbar-home" to="/">
        Home
      </Link>
      <Link className="navbar-login" to="/login">
        Login
      </Link>
      <Link className="navbar-login" to="/signup">
        Signup
      </Link>
    </nav>
  );
};

export default Navbar;

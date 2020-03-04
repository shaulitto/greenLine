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
      <nav className="navbar">
        <img
          className="Logo"
          height="128px"
          src="/GreenLineLogo.png"
          alt="Logo"
        />
        <Link to="/" onClick={props.resetTripResults}>
          <img
            className="HomeIcon Icon"
            src="/home.svg"
            alt="Home"
            height="32px"
          />
          <p>Home</p>
        </Link>
        <Link to="/user">
          <img
            className="HomeIcon Icon"
            src="/user.svg"
            alt="User"
            height="32px"
          />
          <p>User</p>
        </Link>
        <Link onClick={logout} to="/">
          <img
            className="LogoutIcon Icon"
            src="/logout.svg"
            alt="Logout"
            height="32px"
          />
          <p>Logout</p>
        </Link>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <img
        className="Logo"
        height="128px"
        src="/GreenLineLogo.png"
        alt="Logo"
      />

      <Link className="navbar-home" to="/" onClick={props.resetTripResults}>
        <img
          className="HomeIcon Icon"
          src="/home.svg"
          alt="Home"
          height="32px"
        />
        <p>Home</p>
      </Link>
      <Link className="navbar-login" to="/login">
        <img
          className="LoginIcon Icon"
          src="/login.svg"
          alt="Login"
          height="32px"
        />
        <p>Login</p>
      </Link>
      <Link className="navbar-login" to="/signup">
        <img
          className="SignupIcon Icon"
          src="/signup.svg"
          alt="Signup"
          height="32px"
        />
        <p>Signup</p>
      </Link>
    </nav>
  );
};

export default Navbar;

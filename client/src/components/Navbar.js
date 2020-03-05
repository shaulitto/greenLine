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
        <Link to="/" onClick={props.resetTripResults}>
          <img
            className="Logo"
            height="64px"
            src="/GreenLineLogo.png"
            alt="Logo"
          />
        </Link>
        <ul className="UserDropdown">
          <li className="User">
            <img
              className="UserIcon Icon"
              src="/user.svg"
              alt="User"
              height="32px"
            />
            <ul>
              <li>
                <Link to="/user">
                  <p>User</p>
                </Link>
              </li>
              <li>
                <Link onClick={logout} to="/">
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <Link className="navbar-home" to="/" onClick={props.resetTripResults}>
        <img
          className="Logo"
          height="128px"
          src="/GreenLineLogo.png"
          alt="Logo"
        />
      </Link>
      <ul className="UserDropdown">
        <li className="User">
          <img
            className="UserIcon Icon"
            src="/user.svg"
            alt="User"
            height="64px"
          />
          <ul>
            <li>
              <Link className="navbar-login" to="/login">
                <p>Login</p>
              </Link>
            </li>
            <li>
              <Link className="navbar-login" to="/signup">
                <p>Signup</p>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

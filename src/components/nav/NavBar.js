import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header>
      <h1 className="site-title">
        Student Kennels
        <br />
        <small>Loving care when you're not there.</small>
      </h1>
      <nav>
        <ul className="container">
          <li>
            <NavLink className="nav-link" activeClassName="active" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeClassName="active" to="/animals">
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeClassName="active" to="/locations">
              Locations
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeClassName="active" to="/employees">
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" activeClassName="active" to="/owners">
              Owners
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
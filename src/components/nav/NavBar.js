import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  const [search, setSearch] = useState("")

  const handleLogout = () => {
    props.clearUser();
    props.history.push('/');
  }

  const handleFieldChange = evt => {
    const stateToChange = { search };
    stateToChange[evt.target.id] = evt.target.value;
    setSearch(stateToChange);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      //FIXME: how do you pass props on to search?
      props.history.push(`/search/${search.search}`);
    }
  }

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
          {props.hasUser
            ? <li>
                <NavLink className="nav-link" activeClassName="active" to="/animals">
                  Animals
                </NavLink>
              </li>
          : null}
          {props.hasUser
            ? <li>
                <NavLink className="nav-link" activeClassName="active" to="/locations">
                  Locations
                </NavLink>
              </li>
            : null}
          {props.hasUser
            ? <li>
                <NavLink className="nav-link" activeClassName="active" to="/employees">
                  Employees
                </NavLink>
              </li>
            : null}
          {props.hasUser
            ? <li>
                <NavLink className="nav-link" activeClassName="active" to="/owners">
                  Owners
                </NavLink>
              </li>
            : null}
          {props.hasUser
            ? <li>
                <span className="nav-link" onClick={handleLogout}> Logout </span>
              </li>
            : <li>
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>}
          {props.hasUser
            ? <li>
                <input 
                  type="text"
                  onChange={handleFieldChange}
                  onKeyUp={handleKeyPress}
                  search={search}
                  id="search"
                  placeholder="Type search here..."
                />
              </li>
            : null
          }
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
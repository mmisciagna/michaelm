import React from 'react';
import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="mm-nav">
      <NavLink className="mm-nav__item"
          to={'/'}>
        <span>About</span>
      </NavLink>
      <NavLink className="mm-nav__item"
          to={'/projects'}>
        <span>Projects</span>
      </NavLink>
    </nav>
  )
}

export default Nav;
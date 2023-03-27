import React from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalString } from '../../global/global.constants';
import Nav from '../nav/Nav';


function Header() {
  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <NavLink to={`/`}
              aria-label='Home'>
            <span>{GlobalString.PRONUNCIATION}</span>
          </NavLink>
        </div>
        <Nav />
      </header>
    </>
  )
}

export default Header;

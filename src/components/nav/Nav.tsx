import React from 'react';
import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="mm-nav">
      <a className="mm-nav__item"
          href="https://storage.googleapis.com/michaelm.appspot.com/mm-ddg-how-youtube-works.pdf"
          target='_blank'
          download>
        <span>Download the PDF</span>
      </a>
    </nav>
  )
}

export default Nav;

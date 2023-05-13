import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="display header__branding">
        Bread Today, Gone Tomorrow
      </div>
      <nav className="header__nav">
        <button className="header__nav-item">About</button>
        <button className="header__nav-item">Shop</button>
        <button className="header__nav-item">Location</button>
      </nav>
    </header>
  );
}

export default Header;

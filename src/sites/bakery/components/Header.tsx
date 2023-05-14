import React from 'react';
import { smoothScrolling } from '../Bakery';

function Header() {
  const scrollToSection = (e: React.MouseEvent) => {
    const section = (e.target as HTMLElement).dataset.section;
    const el = document.querySelector(`.${section}`);
    if (el) smoothScrolling(el);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="display header__branding">
          <span>Bread Today,</span> <span>Gone Tomorrow</span>
        </div>
        <nav className="header__nav">
          <button
            className="header__nav-item"
            data-section="about"
            onClick={(e) => scrollToSection(e)}
          >
              About
          </button>
          <button
            className="header__nav-item"
            data-section="shop"
            onClick={(e) => scrollToSection(e)}
          >
            Shop
          </button>
          <button
            className="header__nav-item"
            data-section="location"
            onClick={(e) => scrollToSection(e)}
          >
            Location
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

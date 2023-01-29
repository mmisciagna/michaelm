import * as React from 'react';


export const Header = () => {  
  console.log('header')
  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          Michael Misciagna
        </div>
        <nav className="mm-header__nav">
          <a href="/">Overview</a>
          <a href="/work">Work</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
    </>
  )
};
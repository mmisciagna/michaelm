import * as React from 'react';
import {Link} from 'react-router-dom';


export const Header = (props: {path?: string}) => {
  const navItems = [
    {
      path: '/',
      label: 'Overview'
    },
    {
      path: '/work',
      label: 'Work'
    },
    {
      path: '/contact',
      label: 'Contact'
    },
  ];

  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <Link to={`/`} aria-label="Overview">
            Michael Misciagna
          </Link>
        </div>
        <nav className="mm-header__nav">
          {navItems.map((item: Record<string, string>): any => {
            const path = item.path.split('/')[1] || undefined;
            const isActiveItem = path === props.path;
            const activeClassName = isActiveItem ? 'mm-header__nav-item--active' : ''

            return (
              <Link key={item.label}
                  className={`mm-header__nav-item ${activeClassName}`}
                  to={item.path}>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>
    </>
  )
};
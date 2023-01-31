import * as React from 'react';
import {Link} from 'react-router-dom';
import {PATHS, getHomepageDetails} from '../../routes/root';


export const Header = (props: {path: string}) => {
  const homepageDetails = getHomepageDetails();

  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <Link to={`/${homepageDetails.path}`} aria-label={homepageDetails.label}>
            <span>Michael Misciagna</span>
          </Link>
        </div>
        <nav className="mm-header__nav">
          {PATHS.map((item: PathDetails) => {
            const path = item.path;
            const isActiveItem = path === props.path;
            const activeClassName = isActiveItem ? 'mm-header__nav-item--active' : ''

            return (
              <Link key={item.label}
                  className={`mm-header__nav-item ${activeClassName}`}
                  to={`/${item.path}`}>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </header>
    </>
  )
};
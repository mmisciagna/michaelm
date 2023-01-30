import * as React from 'react';
import {Link} from 'react-router-dom';
import {PATHS} from '../global/global.constants';
import {getHomepageDetails} from '../global/global.utils';


export const Header = (props: {path: string}) => {
  const homepageDetails = getHomepageDetails();

  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <Link to={`/${homepageDetails.path}`} aria-label={homepageDetails.label}>
            Michael Misciagna
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
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>
    </>
  )
};
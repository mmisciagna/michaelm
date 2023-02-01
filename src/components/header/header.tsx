import * as React from 'react';
import {Link} from 'react-router-dom';
import {PATHS, getRouteDetails} from '../../routes/root';
import {GlobalString} from '../../global/global.constants';


export const Header = (props: {path: string}) => {
  const homepageDetails = getRouteDetails('');

  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <Link to={`/${homepageDetails.path}`} aria-label={homepageDetails.label}>
            <span>{GlobalString.pronunciation}</span>
          </Link>
        </div>
        <nav className="mm-header__nav">
          {PATHS.map((item: PathDetails) => {
            const path = item.path;
            const isActiveItem = path === props.path;
            const activeClassName =
                isActiveItem ? 'mm-header__nav-item--active' : ''

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
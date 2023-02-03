import * as React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../global/global.store';
import {updatePath} from '../../global/global.store.slice';
import {PATHS} from '../../routes/root';
import {GlobalString} from '../../global/global.constants';
import {getRouteDetails} from '../../global/global.utils';


export const Header = (props: {path: string}) => {
  const homepageDetails = getRouteDetails('') as PathDetails;
  const dispatch = useAppDispatch();

  return (
    <>
      <header className="mm-header">
        <div className="mm-header__branding">
          <Link to={`/${homepageDetails.path}`} aria-label={homepageDetails.label}>
            <span>{GlobalString.PRONUNCIATION}</span>
          </Link>
        </div>
        <nav className="mm-header__nav">
          {PATHS.map((item: PathDetails) => {
            const path = item.path;
            const isActiveItem = path === props.path;
            const activeClassName =
                isActiveItem ? 'mm-header__nav-item--active' : '';
            const el = item.label ?
                <Link key={item.label}
                    className={`mm-header__nav-item ${activeClassName}`}
                    to={`/${item.path}`}
                    onClick={() => dispatch(updatePath(path))}>
                  <span>{item.label}</span>
                </Link> : '';

            return (el);
          })}
        </nav>
      </header>
    </>
  )
};
import * as React from 'react';
import {Link} from 'react-router-dom';
import {GCP_STORAGE_BUCKET} from '../../global/global.constants';
import {PATHS} from '../../routes/root';


export const Footer = (props: {path: string}) => {
  return (
    <>
      <footer className="mm-footer">
        <nav className="mm-footer__nav">
          {PATHS.map((item: PathDetails) => {
            const path = item.path;
            const isActiveItem = path === props.path;
            const activeClassName = isActiveItem ? 'mm-footer__nav-item--active' : ''

            return (
              <Link key={item.label}
                  className={`mm-footer__nav-item ${activeClassName}`}
                  to={`/${item.path}`}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className='mm-footer__ancillary-links'>
          <a href={`${GCP_STORAGE_BUCKET}/michael-misciagna-resume.pdf`}  aria-label="CV" download>
            CV
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/>
            </svg>
          </a>
          |
          <a href='https://www.linkedin.com/in/michaelmisciagna/' target="_blank" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </>
  )
};
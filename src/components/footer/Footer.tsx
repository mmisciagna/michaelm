import React from 'react';
import { Link as AutoScroll } from 'react-scroll';
import { GCP_STORAGE_BUCKET } from '../../global/constants';
import Nav from '../nav/Nav';


function Footer() {
  return (
    <footer className="mm-footer" style={{
      justifyContent: 'center',
    }}>
      <Nav />
    </footer>
  )
}

export default Footer;

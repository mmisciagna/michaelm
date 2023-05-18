import React from 'react';
import { Link as AutoScroll } from 'react-scroll';
import { useSeoData } from '../../global/hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Shop from './components/Shop';
import Location from './components/Location';

function Bakery() {
  useSeoData('Bread Today, Gone Tomorrow', 'bakery');

  return <>
    <Hero />
    <Header />
    <About />
    <Shop />
    <Location />
    <footer className="footer" style={{
      margin: '0 var(--negate-main-padding-x)',
      background: 'var(--color-brown-10)',
      padding: 'var(--main-padding-y) var(--main-padding-x)',
      textAlign: 'center',
    }}>
      <AutoScroll
          to={'top'}
          smooth={true}
          duration={500}
          href="">
        Back to top
      </AutoScroll>
    </footer>
  </>;
}

export default Bakery;

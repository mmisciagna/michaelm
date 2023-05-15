import React from 'react';
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
      minHeight: '500px',
      margin: '0 var(--negate-main-padding-x)',
      background: 'var(--color-brown-10)',
    }} />
  </>;
}

export default Bakery;

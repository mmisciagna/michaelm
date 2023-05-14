import React from 'react';
import { useSeoData } from '../../global/hooks';
import Hero from './components/Hero';
import About from './components/About';
import Header from './components/Header';

function Bakery() {
  useSeoData('Bread Today, Gone Tomorrow', 'bakery');

  return <>
    <Hero />
    <Header />
    <About />
    <About />
  </>;
}

export default Bakery;

import React from 'react';
import { useSeoData } from '../../global/hooks';
import Hero from './components/Hero';
import About from './components/About';
import Header from './components/Header';

export const smoothScrolling = (el: Element) => {
  el.scrollIntoView({
    behavior: 'smooth',
  });
};

function Bakery() {
  useSeoData('Bread Today, Gone Tomorrow', 'bakery');

  return <>
    <Hero />
    <Header />
    <About />
  </>;
}

export default Bakery;

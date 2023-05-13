import React from 'react';
import { useSeoData } from '../../global/hooks';
import Hero from './components/Hero';

function Bakery() {
  useSeoData('Bread Today, Gone Tomorrow', 'bakery');

  return (
    <Hero />
  );
}

export default Bakery;

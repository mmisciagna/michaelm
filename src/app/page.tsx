import React from 'react';
import { Metadata } from 'next';
import { head } from '@/globals/metadata';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Resume from '@/components/Resume';

export const metadata: Metadata = {
  title: `About - ${head.title}`,
};

export default function About() {
  return (
    <>
      <Hero />
      <Header classes="negate-main-spacing-x" />
      <Intro />
      <Resume />
    </>
  );
}

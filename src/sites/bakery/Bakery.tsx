import React from 'react';
import { useSeoData } from '../../global/hooks';

function Bakery() {
  useSeoData('Bread Today, Gone Tomorrow', 'bakery');

  return (
    <section className="hero">
      <video
        className="video"
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/static/videos/bakery-hero.mp4" type="video/mp4"></source>
      </video>
      <div className="content">
        <h1 className="display h1">Bread Today,<br />Gone Tomorrow</h1>
        <p className="body">Lorem ipsum <a href="https://google.com">dolor sit amet</a> consectetur adipisicing elit. Quidem, maiores! Suscipit voluptatibus possimus, incidunt minus deserunt qui quisquam nostrum est perferendis vel nam blanditiis quos recusandae harum quasi beatae deleniti?</p>
      </div>
    </section>
  );
}

export default Bakery;

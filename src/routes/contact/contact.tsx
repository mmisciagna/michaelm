import * as React from 'react';
import {usePageTitleEffect} from '../../global/global.utils';


export const Contact = () => {
  usePageTitleEffect('Contact');

  return (
    <>
      <section className="mm-section">
        <h1>Contact</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab id necessitatibus non vel, quae voluptas? Quidem quaerat at quis, laborum praesentium omnis, repellendus ea adipisci culpa atque, voluptates ex sequi.
        </p>
      </section>
    </>
  )
};

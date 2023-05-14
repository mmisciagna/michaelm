import React from 'react';
import { Link } from 'react-scroll';

function About() {
  return (
    <section className="section about" id="about">
      <h2 className="eyebrow">
        Our Story
      </h2>
      <div className="grid">
        <div className="grid__cell flex-center fpo">
          FPO
        </div>
        <div className="grid__cell">
          <h3 className="display h3">
            The beloved pizzeria and bakery
          </h3>
          <p>
            It all began many years ago, when a young Italian immigrant named Michael arrived in a new land with nothing but his love for food and a dream to share it with the world. Michael's passion for baking and pizza-making had been passed down to him from his father, who had owned a small bakery in their hometown. With his recipes and techniques, Michael set out to create his own unique version of Italian-style pizza and baked goods. He spent countless hours experimenting with different ingredients and perfecting his craft until he finally opened his own small pizzeria and bakery in the heart of the city.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;

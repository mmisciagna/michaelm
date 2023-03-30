import React from 'react';
import { usePageTitleEffect } from '../../global/global.utils';


function Projects() {
  usePageTitleEffect('Projects');

  return (
    <div className="mm-projects">
      <section className="mm-section">
        <h1>Showcasing my projects</h1>
      </section>
      <section className="mm-section mm-section--full-bleed">
        <div className="mm-section__inner">
          <p style={{
            margin: 'unset'
          }}>
            As a frontend engineer and designer with a passion for creating exceptional user experiences, I am constantly seeking new challenges and opportunities to refine my skills. On this page, you'll find a selection of projects that showcase my expertise in a variety of programming languages, frameworks, and tools. Each project represents a unique challenge that required creative thinking and technical prowess.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Projects;

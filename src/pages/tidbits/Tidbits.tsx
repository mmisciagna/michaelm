import React from 'react';
import tidbitsMd from '../../global/content/tidbits.md'


function Tidbits() {
  const today = new Date();
  const date = new Intl.DateTimeFormat('en-US').format(today);

  return (
    <div className="mm-tidbits">
      <section className="mm-section">
        <h1>Tidbits</h1>
        <p>Last updated: {date}</p>
        <p>
          If you're a developer, designer, or just someone interested in web development, you'll find a wealth of useful information and tips here. I've gathered a variety of frontend dev tidbits that cover everything from HTML and CSS tricks to JavaScript best practices and framework updates. There's no rhyme or reason to these. They're just tidbits I ran across online and found interesting.
        </p>
      </section>
      <section className="mm-section mm-section--full-bleed" style={{
        marginBottom: 'unset',
      }}>
        <div className="mm-section__inner">
          <div className="mm-tidbits__content"
              dangerouslySetInnerHTML={{__html: tidbitsMd}} />
          </div>
      </section>
    </div>
  )
}

export default Tidbits;

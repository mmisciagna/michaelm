import * as React from 'react';
import {RESUME_CONTENT} from './resume';


export const About = () => {
  console.log(RESUME_CONTENT)
  return (
    <section className="mm-section mm-resume">
      {RESUME_CONTENT.map((section: any) => {
        return (
          <>
            <div className="mm-resume__col-l">
              <h2>{section.title}</h2>
            </div>
            <div className="mm-resume__col-r">
              {section.entries ? section.entries.map((entry: any) => {
                return (
                  <div className="mm-resume__entry" key={entry.place}>
                    {entry.place ? <h3>{entry.place}{entry.role ? <span> / {entry.role}</span> : ''}</h3> : ''}
                    {entry.dates ? <p className="mm-resume__dates">{entry.dates}</p> : ''}
                    {entry.details.map((details: any, i: number) => {
                      return (
                        <div key={i}>
                          {details.subhead ? <h4>{details.subhead}</h4> : ''}
                          {details.description.map((p: string) => {
                            return (
                              <p key={p}>
                                {p}
                              </p>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              }) : ''}
            </div>
          </>
        )
      })}
    </section>
  )
};

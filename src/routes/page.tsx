import * as React from 'react';
import {useParams} from 'react-router-dom';
import {Overview} from './overview';
import {Work} from './work';
import {Contact} from './contact';


const getElement = (path?: string) => {
  switch (path) {
    case 'work':
      return <Work />;
    case 'contact':
      return <Contact />;
    default:
      return <Overview />;
  }
};

export const Page = () => {
  const {path} = useParams();
  const element =  getElement(path);
  return (element);
};

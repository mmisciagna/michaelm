import * as React from 'react';
import {useParams} from 'react-router-dom';
import {Home} from './home';
import {Work} from './work';
import {Contact} from './contact';


const getElement = (path?: string) => {
  switch (path) {
    case 'work':
      return <Work />;
      break;
    case 'contact':
      return <Contact />;
      break;
    default:
      return <Home />;
  }
}

export const Root = () => {  
  const {path} = useParams();
  const element = getElement(path);
  return (element);
};

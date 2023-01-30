import * as React from 'react';
import {Overview} from '../routes/overview';
import {Work} from '../routes/work';
import {Contact} from '../routes/contact';


// Keep in this order.
export const PATHS: PathDetails[] = [
  {
    path: '',
    element: <Overview />,
    label: 'Overview',
  },
  {
    path: 'work',
    element: <Work />,
    label: 'Work',
  },
  {
    path: 'contact',
    element: <Contact />,
    label: 'Contact',
  },
];

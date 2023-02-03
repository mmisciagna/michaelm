import * as React from 'react';
import {useEffect} from 'react';
import {useParams, Outlet} from 'react-router-dom';
import slugify from 'react-slugify';
import {Provider} from 'react-redux';
import {store, useAppSelector, useAppDispatch} from '../global/global.store';
import {updatePath} from '../global/global.store.slice';
import {getRouteDetails, redirectRoute} from '../global/global.utils';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {About} from './about/about';
import {Work} from './work/work';
import {SHOWCASES} from './work/showcases';
import {Contact} from './contact/contact';


export const PATHS: PathDetails[] = [
  {
    path: '',
    element: <About />,
    label: 'About',
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
  {
    path: 'showcaseDetails',
    element: <h1>Showcase</h1>,
  },
];

export const Page = () => {
  let path = useAppSelector((state) => state.path.value);
  let {showcase} = useParams();
  let showcaseDetails: any = undefined;
  const dispatch = useAppDispatch();

  if (showcase) {
    showcaseDetails = SHOWCASES.find((item: any) => {
      return showcase === slugify(item.title);
    });

    if (path === 'work') {
      if (showcaseDetails) {
        path = 'showcaseDetails';
      } else {
        redirectRoute('work', dispatch);
      }
    } else {
      if (showcase) {
        redirectRoute('', dispatch);
      }
    }
  }

  const pageDetails = getRouteDetails(path);
  const pageElement = pageDetails ? pageDetails.element :
      (getRouteDetails('') as PathDetails).element;

  return pageElement;
};

const Layout = () => {
  let {path: pathOnLoad} = useParams();
  if (!pathOnLoad) pathOnLoad = '';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updatePath(pathOnLoad));
  }, []);

  const path = useAppSelector((state) => state.path.value);

  if (!getRouteDetails(path)) {
    redirectRoute('', dispatch);
  }

  const className = path || slugify(getRouteDetails('')?.label);

  return (
    <>
      <Header path={path} />
      <main className={`mm-main mm-${className}`}>
        <Outlet />
      </main>
      <Footer path={path} />
    </>
  )
};

export const Root = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

import * as React from 'react';
import slugify from 'react-slugify';
import {useEffect} from 'react';
import {useParams, Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import {GlobalString} from '../global/global.constants';
import {store, useAppSelector, useAppDispatch} from '../global/global.store';
import {updatePath, updateShowcase} from '../global/global.store.slice';
import {getRouteDetails, redirectRoute} from '../global/global.utils';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {About} from './about/about';
import {Work} from './work/work';
import {SHOWCASES} from '../global/content/showcases';
import {Contact} from './contact/contact';
import {Showcase} from './showcase/showcase';


export const ROUTE_DETAILS: RouteDetails[] = [
  {
    path: GlobalString.HOME_PATH,
    element: <About />,
    label: 'About',
  },
  {
    path: 'work',
    element: <Work />,
    label: 'Work',
    showcasePortal: true,
  },
  {
    path: 'contact',
    element: <Contact />,
    label: 'Contact',
  },
  {
    path: GlobalString.SHOWCASE_PATH,
    element: <Showcase />,
  },
];

export const Page = () => {
  let path = useAppSelector((state) => state.store.path);
  let {showcase} = useParams();
  let showcaseDetails: Showcase|undefined = undefined;
  const dispatch = useAppDispatch();

  console.log(path)

  if (showcase) {
    const routeDetails = getRouteDetails(path) as RouteDetails;

    if (routeDetails.showcasePortal === true) {
      showcaseDetails = SHOWCASES.find((item: Showcase) => {
        return showcase === slugify(item.title);
      });

      if (showcaseDetails) {
        path = GlobalString.SHOWCASE_PATH;
      } else {
        redirectRoute(routeDetails.path, dispatch);
      }
    }
  }

  const pageDetails = getRouteDetails(path);
  const pageElement = pageDetails ? pageDetails.element :
      (getRouteDetails(GlobalString.HOME_PATH) as RouteDetails).element;

  window.scrollTo(0, 0);
  return pageElement;
};

const Layout = () => {
  let {path: pathOnLoad, showcase} = useParams();
  if (!pathOnLoad) pathOnLoad = GlobalString.HOME_PATH;

  const showcaseDetails = SHOWCASES.find((item: Showcase) => {
    return slugify(item.title) === showcase;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updatePath(pathOnLoad));
    if (showcaseDetails) dispatch(updateShowcase(showcaseDetails));
  }, []);

  const path = useAppSelector((state) => state.store.path);

  if (!getRouteDetails(path)) {
    redirectRoute(GlobalString.HOME_PATH, dispatch);
  }

  const className =
      path || slugify(getRouteDetails(GlobalString.HOME_PATH)!.label);

  return (
    <>
      {path === GlobalString.HOME_PATH ? '' : <Header path={path} />}
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

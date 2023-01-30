import {PATHS} from '../global/global.constants';


export const getHomepageDetails = (): PathDetails => {
  let homepageDetails = PATHS.find((details: PathDetails) => {
    return details.path === '';
  });

  if (homepageDetails) {
    return homepageDetails;
  } else {
    return PATHS[0];
  }
};

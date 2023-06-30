export const GCP_STORAGE_BUCKET =
  'https://storage.googleapis.com/michaelm.appspot.com';

export enum GlobalString {
  IMG_SRC_BASE = '/static/imgs',
  PRONUNCIATION = '[ mē-shah-nyah ]',
  SHOWCASE_IMG_SRC_BASE = '/static/imgs/showcase',
}

export enum GlobalSelector {
  ANIMATE_ON_OBSERVE = '[data-animate-on-observe]',
}

export enum StorageKey {
  THEME = 'michaelm_theme',
  TIDBIT_TAGS = 'michaelm_tidbit_tags',
}

export const Colors = {
  beige: 'hsl(24 100% 97%)',
  bronze: constructColorRange(24, 25), // 300
  slate: constructColorRange(215, 19), // 800
};

/**
 *  Returns a range of hsl colors with the given hue and saturation and
 *  lightnesses from 90% – 10%.
 *
 *  Example: {
 *    100: 'hsl(215 19% 90%)',
 *    200: 'hsl(215 19% 80%)',
 *    300: 'hsl(215 19% 70%)',
 *    400: 'hsl(215 19% 60%)',
 *    500: 'hsl(215 19% 50%)',
 *    600: 'hsl(215 19% 40%)',
 *    700: 'hsl(215 19% 30%)',
 *    800: 'hsl(215 19% 20%)',
 *    900: 'hsl(215 19% 10%)',
 *  }
 */
function constructColorRange(
  hue: number,
  saturation: number
): Record<number, string> {
  let lightness = 90;
  let key = 100;

  const colorRange: Record<number, string> = {};

  while (key <= 900) {
    colorRange[key] = `hsl(${hue} ${saturation}% ${lightness}%)`;
    lightness -= 10;
    key += 100;
  }

  return colorRange;
}

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
}

export const Colors = {
  'slate': constructColorRange(215, 19),
  'slate-blue': 'hsl(215 19% 22%)',
  'slate-blue-md': 'hsl(215 18% 20%)',
  'slate-blue-90': 'hsl(215 19% 22% / .9)',
  'slate-blue-10': 'hsl(215 19% 22% / .1)',
  'slate-blue-dk': 'hsl(215 28% 9%)',
  'slate-blue-dk-90': 'hsl(215 28% 9% / .9)',
  // Accent
  'bronze': 'hsl(24 25% 66%)',
  'bronze-10': 'hsl(24 25% 66% / .1)',
  'off-white': 'hsl(30 100% 97%)',
  // White
  'white': 'hsl(0 0% 100%)',
  'white-70': 'hsl(0 0% 100% / .7)',
  'white-50': 'hsl(0 0% 100% / .5)',
  'white-25': 'hsl(0 0% 100% / .25)',
  'white-10': 'hsl(0 0% 100% / .1)',
  // Black
  'black': 'hsl(0 0% 0%)',
  'black-25': 'hsl(0 0% 0% / .25)',
  'black-10': 'hsl(0 0% 0% / .1)',
  'black-05': 'hsl(0 0% 0% / .05)',
  // Succss/Error
  'green': 'hsl(120 100% 25%)',
  'green-10': 'hsl(120 100% 25% / .1)',
  'green-lgt': 'hsl(120 41% 72%)',
  'red': 'hsl(0 41% 45%)',
  'red-10': 'hsl(0 41% 45% / .1)',
  'red-lgt': 'hsl(0 47% 74%)',
};

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

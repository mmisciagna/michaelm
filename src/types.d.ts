interface Showcase {
  apis?: string[];
  description: string;
  client?: string;
  img: string;
  role?: string;
  siteLink?: string;
  title: string;
  stack?: string[];
  videoId?: string;
  videoStart?: string;
}

interface Tidbit {
  content: string,
  data: {
    date: string,
    tags: string[],
    title: string,
  },
  excerpt: string,
  isEmpty: boolean,
}

declare module '*.md';

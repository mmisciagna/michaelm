interface Showcase {
  content: string;
  data: {
    apis?: string[];
    description: string;
    client?: string;
    img: string;
    role?: string;
    siteLink?: string;
    title: string;
    type?: string;
    stack?: string[];
    videoId?: string;
    videoStart?: string;
  };
  excerpt: string;
  isEmpty: boolean;
}

interface Tidbit {
  content: string;
  data: {
    date: string;
    tags: string[];
    title: string;
  };
  excerpt: string;
  isEmpty: boolean;
}

type StructuredTidbits = Tidbit[][];

interface Window {
  onYouTubeIframeAPIReady: () => void;
}

declare module '*.md';
declare module '*.scss';

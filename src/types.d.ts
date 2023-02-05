interface RouteDetails {
  element: React.ReactElement;
  label?: string;
  path: string;
  showcasePortal?: boolean;
}

interface Showcase {
  apis?: string;
  description: string[];
  client: string;
  img: string;
  role: string;
  siteLink?: string;
  title: string;
  tools: string;
  videoId?: string;
}

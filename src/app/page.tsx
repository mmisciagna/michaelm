import { Metadata } from 'next';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `About - ${head.title}`,
};

export default function About() {
  return (
    <>
      <h1 className="my-16 font-display text-h1">Headline 1</h1>
      <h2 className="my-16 font-display text-h2">Headline 2</h2>
      <h3 className="my-16 font-display text-h3">Headline 3</h3>
      <h4 className="my-16 font-display text-h4">Headline 4</h4>
      <p className="my-16">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt quae
        dolores, molestiae assumenda officia in, culpa voluptate eligendi totam,
        cumque fuga consectetur? Accusamus molestiae ipsa quo iure est
        consectetur odio.
      </p>
      <p className="my-16 text-md">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt quae
        dolores, molestiae assumenda officia in, culpa voluptate eligendi totam,
        cumque fuga consectetur? Accusamus molestiae ipsa quo iure est
        consectetur odio.
      </p>
      <p className="my-16 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt quae
        dolores, molestiae assumenda officia in, culpa voluptate eligendi totam,
        cumque fuga consectetur? Accusamus molestiae ipsa quo iure est
        consectetur odio.
      </p>
      <p className="my-16 text-xs">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt quae
        dolores, molestiae assumenda officia in, culpa voluptate eligendi totam,
        cumque fuga consectetur? Accusamus molestiae ipsa quo iure est
        consectetur odio.
      </p>
    </>
  );
}

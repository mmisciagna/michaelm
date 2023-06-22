import { Metadata } from 'next';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `Projects - ${head.title}`,
};

export default function Projects() {
  return (
    <>
      <h1>Projects</h1>
    </>
  );
}

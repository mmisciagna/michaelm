import { Metadata } from 'next';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `Projects - ${head.title}`,
};

export default function ProjectsOverview() {
  return (
    <>
      <h1>Projects</h1>
    </>
  );
}

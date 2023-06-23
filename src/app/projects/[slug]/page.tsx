import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { head } from '@/globals/metadata';
import { getCurrentShowcase } from '@/globals/utils';

interface Params {
  params: { slug: string };
}

export default function Project({ params }: Params) {
  const showcase = getCurrentShowcase(params.slug);

  if (showcase == null) {
    redirect('/404');
  }

  const { data, content } = showcase;
  const { title } = data;

  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const showcase = getCurrentShowcase(params.slug);

  return {
    title: `${showcase?.data.title} - Projects - ${head.title}`,
  };
}

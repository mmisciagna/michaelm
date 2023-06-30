import { Metadata } from 'next';
import { head } from '@/globals/metadata';
import TidbitGroup from './components/TidbitGroup';

interface Params {
  params: { id: number };
}

export default function TidbitsPage({ params }: Params) {
  return <TidbitGroup id={params.id} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Tidbits - ${head.title}`,
  };
}

import { Metadata } from 'next';
import { head } from '@/globals/metadata';

interface Params {
  params: { id: number };
}

export default function Tidbits({ params }: Params) {
  return <h1>Tidbits {params.id}</h1>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Tidbits - ${head.title}`,
  };
}

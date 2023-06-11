import { Metadata } from 'next';
import { head } from '@/global/metadata';

export const metadata: Metadata = {
  title: `Tidbits - ${head.title}`,
};

export default function Tidbits() {
  return <h1>Tidbits</h1>;
}

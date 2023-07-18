import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `Tidbits - ${head.title}`,
  alternates: { canonical: '/tidbits' },
};

export default function Tidbits() {
  redirect('/tidbits/1');
}

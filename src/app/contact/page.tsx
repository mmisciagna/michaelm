import { Metadata } from 'next';
import { head } from '@/globals/metadata';

export const metadata: Metadata = {
  title: `Contact - ${head.title}`,
};

export default function Contact() {
  return <h1>Contact</h1>;
}

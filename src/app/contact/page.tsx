import { Metadata } from 'next';
import { head } from '@/globals/metadata';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: `Contact - ${head.title}`,
};

export default function Contact() {
  return (
    <>
      <ContactForm />
    </>
  );
}

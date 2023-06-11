import { head } from '../global/metadata';
import { bodyTypeface } from '../global/typefaces';
import '../global/globals.scss';

export const metadata = head;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={bodyTypeface.className}>
      <body>{children}</body>
    </html>
  );
}

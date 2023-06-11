import { head } from '../global/metadata';
import '@/global/globals.scss';

export const metadata = head;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full text-lg leading-relaxed text-slate-blue antialiased sm:text-xl"
    >
      <body className="m-0 flex min-h-full w-full flex-col bg-off-white">
        <main className="flex-1 px-24 sm:px-48 lg:px-80">{children}</main>
      </body>
    </html>
  );
}

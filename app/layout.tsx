import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ViewTracker } from './components/viewTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Othmane Ferrah - Street & Documentary Photographer',
  description: 'Street & documentary photographer focused on motion, emotion, and real human stories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-28 md:pb-0`}>
        <ViewTracker />
        {children}
      </body>
    </html>
  );
}

import './globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const url = 'https://ui-guideline-archive.vercel.app';
const title = 'UI Guidelines Archive';
const description =
  'A non-exhaustive list of details that make a good web interface.';
const ogUrl = `${url}/og.png`;

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  title,
  description,
  publisher: 'Vercel',
  openGraph: {
    title,
    description,
    url,
    images: [{ url: ogUrl }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Unbounded } from 'next/font/google';
import { Header, Footer, InstagramButton } from '@/components/layout';
import { StructuredData } from '@/components/StructuredData';
import './globals.css';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ecstaticsunday.com'),
  title: {
    default: 'Ecstatic Sunday | Move. Connect. Transform.',
    template: '%s | Ecstatic Sunday',
  },
  description:
    'A weekly ecstatic dance gathering in Mazunte, Mexico — where rhythm meets community under the sun. Every Sunday from 12pm to 4pm.',
  keywords: [
    'ecstatic dance',
    'Mazunte',
    'Oaxaca',
    'Mexico',
    'dance community',
    'conscious dance',
    'movement practice',
    'Sunday dance',
    'ecstatic movement',
  ],
  authors: [{ name: 'Ecstatic Sunday' }],
  creator: 'Ecstatic Sunday',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecstaticsunday.com',
    siteName: 'Ecstatic Sunday',
    title: 'Ecstatic Sunday | Move. Connect. Transform.',
    description:
      'A weekly ecstatic dance gathering in Mazunte, Mexico — where rhythm meets community under the sun.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ecstatic Sunday - Ecstatic Dance in Mazunte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecstatic Sunday | Move. Connect. Transform.',
    description:
      'A weekly ecstatic dance gathering in Mazunte, Mexico — where rhythm meets community under the sun.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <InstagramButton />
      </body>
    </html>
  );
}

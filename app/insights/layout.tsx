import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights | ARCHECO',
  description: 'Exploring UX strategies, design thinking, and future business trends. Read our latest articles on digital transformation and UI/UX design.',
  openGraph: {
    title: 'Insights | ARCHECO',
    description: 'Exploring UX strategies, design thinking, and future business trends.',
    url: 'https://archeco.co.jp/insights',
    siteName: 'ARCHECO',
    images: [
      {
        url: '/media/insights/og-insights.png', // I should check if this exists or use a generic one
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | ARCHECO',
    description: 'Exploring UX strategies, design thinking, and future business trends.',
    images: ['/media/insights/og-insights.png'],
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://archeco.eu"),
  title: {
    default: "ARCHECO — Design, Technology & AI Studio | Tokyo & Malta",
    template: "%s — ARCHECO",
  },
  description:
    "ARCHECO is an independent design, technology and AI studio based in Tokyo and Malta. Senior team. Serious craft. We design the next generation of digital products, services and intelligent systems.",
  keywords: ["UX Design", "AI Studio", "Service Design", "Tokyo", "Malta", "Digital Products"],
  authors: [{ name: "ARCHECO" }],
  creator: "ARCHECO",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ARCHECO",
    title: "ARCHECO — Design, Technology & AI Studio",
    description:
      "Independent design, technology and AI studio — Tokyo & Malta. Senior team, serious craft.",
    url: "https://archeco.eu",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "ARCHECO — Design, Technology & AI Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCHECO — Design, Technology & AI Studio",
    description: "Independent design, technology and AI studio — Tokyo & Malta.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,200&family=Barlow+Condensed:ital,wght@0,300;0,600;0,700&family=Barlow:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/archeco.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body suppressHydrationWarning={true}>
        <div id="cur-d" aria-hidden="true"></div>
        <div id="cur-r" aria-hidden="true"></div>

        {children}

        {/*
          archeco.js gère : cursor, nav scroll, scroll reveals (.rv → .in),
          counters, carousel, filters, lightbox.
          Le script inline "reveal" a été supprimé — archeco.js est l'unique
          gestionnaire pour éviter le double déclenchement.
        */}
        <Script src="/archeco.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

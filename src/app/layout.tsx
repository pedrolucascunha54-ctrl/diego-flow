import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SITE } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Tatuagem de Realismo Preto e Cinza | ${SITE.artist}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "tatuagem realismo",
    "tatuagem preto e cinza",
    "tatuador realismo",
    "Diego Mesquita",
    "Flow Tattoo",
    "tatuagem fechamento",
    "cover up tatuagem",
    "tatuagem mitologia",
    "tatuagem arte sacra",
  ],
  authors: [{ name: SITE.artist }],
  creator: SITE.artist,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Tatuagem de Realismo Preto e Cinza`,
    description: SITE.description,
    images: [
      {
        url: "/posters/retrato-serpente.jpg",
        width: 1200,
        height: 1600,
        alt: `${SITE.name} — Realismo Preto e Cinza`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Tatuagem de Realismo Preto e Cinza`,
    description: SITE.description,
    images: ["/posters/retrato-serpente.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: SITE.name,
  image: `${SITE.url}/posters/retrato-serpente.jpg`,
  description: SITE.description,
  founder: {
    "@type": "Person",
    name: SITE.artist,
    jobTitle: "Tatuador especialista em Realismo Preto e Cinza",
  },
  areaServed: "BR",
  priceRange: "$$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

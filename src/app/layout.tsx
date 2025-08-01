import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { LanguageProvider  } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: 'Travel Landing',
  description: 'Travel App Sliced and Coded by Rudiansyah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
        {children}
        </LanguageProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

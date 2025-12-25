import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

/**
 * Métadonnées globales du site
 * Utilisées pour le SEO et l’affichage dans le navigateur
 */
export const metadata: Metadata = {
  title: 'Hackathon 2026 | CFI-CIRAS',
  description: 'Site web premium et immersif du Hackathon 2026 organisé par le CFI-CIRAS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Préconnexion aux serveurs Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Polices utilisées dans le projet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-body antialiased">
        {/* Contenu des pages */}
        {children}

        {/* Système de notifications (toasts) */}
        <Toaster />
      </body>
    </html>
  );
}

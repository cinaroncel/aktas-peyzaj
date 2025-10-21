import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aktaş Peyzaj - Bitki Kataloğu',
  description: 'Aktaş Peyzaj bitki kataloğu - İç ve dış mekan bitkileri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
import type { ReactNode } from 'react';
import type { Metadata } from "next";
import '@/assets/style/index.css';

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export const metadata: Metadata = {
  // TODO
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

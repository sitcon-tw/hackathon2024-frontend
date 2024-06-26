import type { ReactNode } from 'react';

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function GameLayout({ children }: RootLayoutProps) {
  return (
    <main className="p-5 max-w-screen-lg m-auto">
        {children}
    </main>
  );
}
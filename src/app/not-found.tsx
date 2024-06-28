import PageLink from '@/components/page_link';

export default function ScannerPage() {
  return <main className="fullscreen flex justify-center items-center flex-col p-5 gap-6 max-w-[500px] m-auto">
    <h1 className="prose">找不到你要的頁面！</h1>
    <PageLink href="/" text="回主頁" />
  </main>
}
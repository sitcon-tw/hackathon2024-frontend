import PageLink from "@/components/page_link";

export default function ErrorPage() {
  return (<main className="fullscreen flex justify-center items-center flex-col p-5 gap-6 max-w-[500px] m-auto">
    <h1 className="prose">系統錯誤！請稍後再試</h1>
    <a className="btn btn-primary" href="/">重新整理</a>
  </main>);
}
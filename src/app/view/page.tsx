'use client'
import PageLink from "@/components/page_link";

export default function View() {
    const baseURL = process.env.NEXT_PUBLIC_API;
    return (
        <main className="flex flex-col items-center gap-3 p-5 fullscreen max-w-screen-md m-auto">
            <PageLink href="/" text="回主頁" />
            <div>
                <h1 className="text-center">
                    以下為你目前蒐集到的集章：
                </h1>
            </div>
            <div className="grid grid-rows-5 grid-cols-5 aspect-square h-1/5">
                { [...Array(25)].map((_, idx) =>
                    <img key={idx} className="h-auto w-auto" src={`${baseURL}/stamp/${idx}`} alt="stamp" />
                )}
            </div>
        </main>
    );
}
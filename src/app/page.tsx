'use client'

import PageLink from '@/components/page_link';

export default function Game() {
    return (
        <div>
            <article className="prose m-auto">
                <h1 className="text-center">歡迎 </h1>
            </article>
            <div className="mt-8 flex flex-col gap-5">
                <PageLink href="/game" text="小遊戲" />
                <PageLink href="/scanner" text="掃描集章" />
                <PageLink href="/view" text="檢視集章 " />
            </div>
        </div>
    )
}
'use client'

import Link from "next/link"
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

function ProblemLink({ id }: { id: number }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const opened_problem = Cookies.get('opened_problem') as string;
    
    if (!isClient)
        return <></>;
    if (Number(opened_problem) < id) {
        return (
            <div className="btn btn-primary btn-disabled">
                第{` ${id} `}關
            </div>
        )
    }
    return (
        <Link href={`/game/${id}`} className="btn btn-primary">
            第{` ${id} `}關
        </Link>
    )
}
export default function Game() {
    return (
        <div>
            <article className="prose m-auto">
                <h1 className="text-center">小活動開場</h1>
                <div className="border rounded border-teal-600 p-2">
                    歡迎各位來到黑克松之不可能的任務，這是屬於勇者的試煉，若你們想成為真勇者，就請期待接下來的挑戰，相信你們都能輕鬆破解，哈哈。 <br/>
                    所有關卡都與前一關有所關聯，請保留好每一關的線索，每一關開始的時間如下：
                    <ol>
                        <li>10:10 進行第一關</li>
                        <li>13:40 進行第二關</li>
                        <li>15:40 進行第三關</li>
                    </ol>
                    另外，每破解一個關卡，都可去固定服務台兌換線上章，前兩關破完各可得 3 枚，最後一關破完可得 4 枚。 <br/>
                    然後，全程請用電腦操作，以避免不必要的麻煩呦 <br/>
                    好了，我說完了，10 分鐘之後正式開始！ <br/>
                </div>
            </article>
            <div className="mt-8 flex flex-col gap-5">
                <ProblemLink id={1} />
                <ProblemLink id={2} />
                <ProblemLink id={3} />
            </div>
        </div>
    )
}
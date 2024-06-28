'use client'

import { useState } from 'react';
import Link from 'next/link';

function page1() {
    return (
        <div>
            <article className="prose m-auto max-w-full">
                <h1 className="text-center">3. 終極試煉</h1>
                <div className="border rounded border-teal-600 p-2">
                    勇者你好，恭喜你來到最後一階段，但你同伴現在正面臨瀕死階段，他現在的狀況實在是相當悲觀，只不過，你也得到了最重要的訊息，而別懷疑，就是字面上的意思，只要你成功，一切的一切將會回歸美好，你們也得以順利回到現實，但不保證你就可以贏得 HACKATHON 歐，哈哈<br/>
                    要如何做到上一關謎語所說的事呢，進到 <Link href="https://github.com/Ianana1111/HACKATHON" target="_blank">秘密之地</Link>，詳閱 README.md，並接受 SITCON HACKATHON 2024 之不可能的任務 : 終局之戰 的最終挑戰吧。
                </div>
            </article>
        </div>
    );
}
function page2() {
    const [message, setMessage] = useState('');
    const [pending, setPending] = useState(false);
    const [messageColor, setMessageColor] = useState('info');
    async function submit(formData: FormData) {
        setPending(true);
        setMessage('正在送出...');
        setMessageColor('info');
        const answer: (FormDataEntryValue | null)[] = [];
        for (let i = 1; i <= 5; i++)
            answer.push(formData.get(i.toString()));
        for (const ans of answer)
            if (ans === '') {
                setPending(false);
                setMessage('五格都要填寫！');
                setMessageColor('warning');
                return;
            }
        setPending(false);
        setMessage('答案正確');
        setMessageColor('success');
    }
    return (
        <div>
            <article className="prose m-auto max-w-full">
                <h1 className="text-center">3. 終極試煉</h1>
                <form className="grid grid-rows-2 grid-cols-3 mt-6 gap-3" action={submit}>
                    <input type="text" name="1" placeholder="第一個字" className="input input-bordered input-secondary" />
                    <input type="text" name="2" placeholder="第二個字" className="input input-bordered input-secondary" />
                    <input type="text" name="3" placeholder="第三個字" className="input input-bordered input-secondary" />
                    <input type="text" name="4" placeholder="第四個字" className="input input-bordered input-secondary" />
                    <input type="text" name="5" placeholder="第五個字" className="input input-bordered input-secondary" />
                    <button type="submit" className="btn btn-neutral" disabled={pending}>送出</button>
                    <div className="prose text-xs">
                        請順利從秘密之地逃出再來作答
                    </div>
                </form>
                <div className="badge-info badge-info badge-warning badge-success hidden" />
                {message !== '' && <div className={`badge badge-${messageColor} m-auto w-full h-10 mt-5`}>
                    {message}
                </div>}

            </article>
        </div>
    );
}

export default function Game() {
    const [page, setPage] = useState(0);
    const PAGE_LEN = 2;
    function handleNext() {
        if (page + 1 < PAGE_LEN)
            setPage(page + 1);
    }
    function handlePrevious() {
        if (page > 0)
            setPage(page - 1);
    }
    return (
        <div>
            {[page1(), page2()][page]}
            <div className="flex flex-row justify-between items-center mt-6">
                <button onClick={handlePrevious} className={`btn btn-primary w-1/3 ${page > 0 ? '' : 'invisible'}`}>上一頁</button>
                <div className="badge badge-neutral h-full">
                    第 {page + 1} 頁
                </div>
                <button onClick={handleNext} className={`btn btn-primary w-1/3 ${page + 1 < PAGE_LEN ? '' : 'invisible'}`}>下一頁</button>
            </div>
        </div>
    );
}
'use client'

import { useState } from 'react';
import Image from 'next/image';
import find from '@/assets/images/game/find.jpg';

function page1() {
    return (
        <div>
            <article className="prose m-auto max-w-full">
                <h1 className="text-center">2. 大家來找茶，噢，是碴</h1>
                <div className="border rounded border-teal-600 p-2">
                    唉呦不錯喔，相信你們到這裡都已經解出第一關謎語了，那想必當然，這題就與第一關謎語有所關聯啦。<br/>
                    你們現在在取得密碼後，要去尋找更多線索來拯救你的同伴，而就在你們即將放棄之時，眼前突然出現一張圖，至於你們則必須透過剛剛 5 個關鍵字，在下圖找到更為秘密的密語，而這密語會是下一關最重要的線索歐，就這樣，簡單吧，簡單的話就趕快找吧，哈哈<br/>
                    另外，第一個單字的第一個字需要大寫歐，請多加注意~
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
                <h1 className="text-center">2. 大家來找茶，噢，是碴</h1>
                <div className="border rounded border-teal-600 p-2">
                    <Image src={find} alt="題目" />
                </div>
                <form className="grid grid-rows-2 grid-cols-3 mt-6 gap-3" action={submit}>
                    <input type="text" name="1" placeholder="第一個字" className="input input-bordered input-secondary" />
                    <input type="text" name="2" placeholder="第二個字" className="input input-bordered input-secondary" />
                    <input type="text" name="3" placeholder="第三個字" className="input input-bordered input-secondary" />
                    <input type="text" name="4" placeholder="第四個字" className="input input-bordered input-secondary" />
                    <input type="text" name="5" placeholder="第五個字" className="input input-bordered input-secondary" />
                    <button type="submit" className="btn btn-neutral" disabled={pending}>送出</button>
                </form>
                <div className="badge-info badge-info badge-warning badge-success hidden" />
                {message !== '' && <div className={`badge badge-${messageColor} m-auto w-full h-10 mt-5`}>
                    {message}
                </div>}

            </article>
        </div>
    );
}
function page3() {
    const [message, setMessage] = useState('');
    const [pending, setPending] = useState(false);
    const [messageColor, setMessageColor] = useState('info');
    async function submit(formData: FormData) {
        setPending(true);
        setMessage('正在送出...');
        setMessageColor('info');
        const answer: (FormDataEntryValue | null)[] = [];
        for (let i = 1; i <= 2; i++)
            answer.push(formData.get(i.toString()));
        for (const ans of answer)
            if (ans === '') {
                setPending(false);
                setMessage('兩格都要填寫！');
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
                <h1 className="text-center">2. 大家來找茶，噢，是碴</h1>
                <form className="grid grid-rows-2 grid-cols-3 mt-6 gap-3" action={submit}>
                    <input type="text" name="1" placeholder="第一個字" className="input input-bordered input-secondary" />
                    <input type="text" name="2" placeholder="第二個字" className="input input-bordered input-secondary" />
                    <button type="submit" className="btn btn-neutral" disabled={pending}>送出</button>
                    <div className="prose text-xs">
                        猜到了嗎?想一下你剛猜的那組英文有甚麼涵義嗎
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
    const PAGE_LEN = 3;
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
            {[page1(), page2(), page3()][page]}
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
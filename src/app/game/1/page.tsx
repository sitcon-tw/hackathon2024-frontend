'use client'

import Image from 'next/image';
import Cookies from 'js-cookie';
import mos1 from '@/assets/images/game/mos1.png';
import mos2 from '@/assets/images/game/mos2.png';
import mos3 from '@/assets/images/game/mos3.png';
import mos4 from '@/assets/images/game/mos4.png';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import handleSubmit from '@/lib/game_submit';

function Page1() {
    return (
        <div>
            <article className="prose m-auto max-w-full">
                <h1 className="text-center">1. 糟了，是秘密通訊</h1>
                <div className="border rounded border-teal-600 p-2">
                    參賽者們你好，在你們深陷水深火熱之前，這短短的10分鐘之內，你們已全數被送回二戰時期，此時你們需要透過一些手段分析你們同伴通過電報傳來的摩斯密碼，只要你們沒能在這一天將密碼解完，你同伴將死於不幸，身為一個勇者，難道你們甘心這樣看著他死去嗎?
                    <p>以下為遊戲說明和摩斯密碼</p>
                    <ul>
                        <li>下圖為各個字的摩斯密碼<br/>
                        <Image src={mos1} alt="摩斯密碼表" />
                        <Image src={mos2} alt="摩斯密碼表二" />
                        例: M 可以表示成
                        <Image src={mos3} alt="摩斯密碼範例" />
                        </li>
                    </ul>

                    而 MORSE CODE 經過電報傳來的摩斯CODE就會如下
                    <Image src={mos4} alt="更多範例" />
                    你可以徒眼暴力解，或讓程式幫你解，而在你解完後，將會得到 5 個英文單字，全為大寫且都為名詞，請牢牢記住歐 <br/>
                    喔對了，據說你們這位同伴喜歡先按照字典序排過再發送訊息，如果是亂的，那可能是不小心被動過了，請多加留意歐，祝你好運
                </div>
            </article>
        </div>
    );
}
function Page2({ setHasDone }: { setHasDone: Dispatch<SetStateAction<boolean>> }) {
    const [message, setMessage] = useState('');
    const [pending, setPending] = useState(false);
    const [messageColor, setMessageColor] = useState('info');
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    return (
        <div>
            <article className="prose m-auto max-w-full">
                <h1 className="text-center">1. 糟了，是秘密通訊</h1>
                <div className="border rounded border-teal-600 p-2">
                    摩斯CODE<br/>
                    <code className="text-wrap break-all">
                    ===...=.===...===.=.=.=...=.===.=.=...=.......===.=.=...===.===.===...===.===.===...=.===.=.......=.=.=...===...=.===...===.===.=...=.......=.===.===...=.===...=.===.=.=...=.===.=.=.......===.=.===.=...===.===.===...===.===...=.===.===.=...=.=.===...===...=...=.===.=
                    </code>
                </div>
                <form className="grid grid-rows-2 grid-cols-3 mt-6 gap-3" action={handleSubmit(0, 5, setMessage, setPending, setMessageColor, setCount, setTotalCount, setHasDone)}>
                    <input type="text" name="1" placeholder="第一個字" className="input input-bordered input-secondary" />
                    <input type="text" name="2" placeholder="第二個字" className="input input-bordered input-secondary" />
                    <input type="text" name="3" placeholder="第三個字" className="input input-bordered input-secondary" />
                    <input type="text" name="4" placeholder="第四個字" className="input input-bordered input-secondary" />
                    <input type="text" name="5" placeholder="第五個字" className="input input-bordered input-secondary" />
                    <button type="submit" className="btn btn-primary" disabled={pending}>送出</button>
                </form>
                <div className="badge-info badge-info badge-error badge-warning badge-success hidden" />
                {message !== '' && <div className={`badge badge-${messageColor} m-auto w-full h-10 mt-5 text-center`}>
                    {message}<br />
                    {totalCount > 0 &&
                        `你獲得了 ${count} / ${totalCount} 個章`
                    }
                </div>}

            </article>
        </div>
    );
}

export default function Game() {
    const [page, setPage] = useState(0);
    const [hasDone, setHasDone] = useState(false);
    const PAGE_LEN = 2;
    function handleNext() {
        if (page + 1 < PAGE_LEN)
            setPage(page + 1);
    }
    function handlePrevious() {
        if (page > 0)
            setPage(page - 1);
    }
    useEffect(() => {
        if (Number(Cookies.get('opened_problem')) >= 1)
            setHasDone(true);
    }, []);
    return (
        <div>
            {[<Page1 key="1" />, <Page2 key="2" setHasDone={setHasDone} />][page]}
            <div className="flex flex-row justify-between items-center mt-6">
                <button onClick={handlePrevious} className={`btn btn-primary w-1/3 ${page > 0 ? '' : 'invisible'}`}>上一頁</button>
                <div className="badge badge-neutral h-full">
                    第 {page + 1} 頁
                </div>
                { page + 1 < PAGE_LEN &&
                    <button onClick={handleNext} className="btn btn-primary w-1/3">下一頁</button>
                }
                { page + 1 == PAGE_LEN && 
                    <Link href="/game" className={`btn btn-primary w-1/3 ${hasDone ? '' : 'invisible'}`}>
                        回到關卡列表
                    </Link>
                }
            </div>
        </div>
    );
}
'use client'

import PageLink from '@/components/page_link';
import { logout } from '@/lib/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Game() {
    const team_name = Cookies.get('team_name');
    const [client, setClient] = useState(false);
    useEffect(() => {
        setClient(true);
    }, []);

    const router = useRouter();
    const handleClick = async () => {
        await logout();
        router.push('/login');
    };

    if (client) {
        return (
            <div>
                <div className="prose m-auto">
                    <h1 className="text-center">歡迎 {team_name}</h1>
                </div>
                <div className="mt-8 flex flex-col gap-5">
                    <PageLink href="/game" text="小遊戲" />
                    <PageLink href="/scanner" text="掃描集章" />
                    <PageLink href="/view" text="檢視集章 " />
                    <button onClick={handleClick} className="btn btn-primary">登出</button>
                </div>
            </div>
        );
    }
    else {
        return <></>
    }
}
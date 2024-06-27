'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import main from '@/assets/images/main.svg';
import { login } from '@/lib/auth';
import Skeleton from '@/components/skeleton';
import { useRouter } from 'next/navigation';


type LoginPageProps = {
  searchParams: {
    token: string;
  }
}


export default function LoginPage(props: LoginPageProps) {
  const tokenInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [fault, setFault] = useState(false);
  const [bounce, setBounce] = useState('');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = tokenInput.current?.value;
    console.log(value);
    if (value) {
      if (await login(value)) {
        console.log('redirecting');
        router.push('/');
      }
      else {
        setFault(true);
        setBounce('animate-bounce');
        setTimeout(() => setBounce(''), 3000);
        setTimeout(() => setFault(false), 3000);
        // For the bumped effect
      }
    }
  }
  

  return (
    <main id="login" className="fullscreen flex justify-center items-center flex-col max-w-96 m-auto">
      <Image src={main} alt="main" />
      <form className="w-10/12 flex justify-center gap-x-3" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="token"
          className="input input-bordered input-info w-full max-w-xs flex-1"
          ref={tokenInput}
        />
        <button className="btn btn-info">送出</button>
      </form>
      { fault && 
        <div className={`prone badge badge-error mt-5  ${bounce}`}>
          token 錯誤！
        </div>
      }
    </main>
  );
}

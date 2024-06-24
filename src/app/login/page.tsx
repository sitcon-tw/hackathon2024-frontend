'use client';

import { FormEvent, useRef } from 'react';
import Image from 'next/image';
import main from '@/assets/images/main.svg';


type LoginPageProps = {
  searchParams: {
    token: string;
  }
}

export default function LoginPage(props: LoginPageProps) {
  const token = props.searchParams.token;
  const tokenInput = useRef<HTMLInputElement>(null);

  const login = async (token: string) => {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API}/login`,
      { method: 'POST', body: JSON.stringify({ user_token: token })}
    );

    const response = await request.json();
    // TODO


  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    const value = tokenInput.current?.value;
    if (value) login(value);

    return e.preventDefault();
  }
  

  if (token) login(token);

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
      
    </main>
  );
}

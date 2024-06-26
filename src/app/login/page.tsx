'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import main from '@/assets/images/main.svg';
import { isAuthenticatedClient, login } from '@/lib/auth';


type LoginPageProps = {
  searchParams: {
    token: string;
  }
}


export default function LoginPage(props: LoginPageProps) {
  const initialToken = props.searchParams.token;
  const tokenInput = useRef<HTMLInputElement>(null);

  const [hasLogged, setHasLogged] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('owo');
    const value = tokenInput.current?.value;
    if (value) login(value);

    setHasLogged(await isAuthenticatedClient());

    return e.preventDefault();
  }
  

  if (initialToken) login(initialToken);
  useEffect(() => {
    isAuthenticatedClient()
      .then((res) => setHasLogged(res));
  });

  return (
    <main id="login" className="fullscreen flex justify-center items-center flex-col max-w-96 m-auto">
      <Image src={main} alt="main" />
      {!hasLogged && <>
        <form className="w-10/12 flex justify-center gap-x-3" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="token"
            className="input input-bordered input-info w-full max-w-xs flex-1"
            ref={tokenInput}
          />
          <button className="btn btn-info">送出</button>
        </form>
      </>}
      {hasLogged && <div className="btn btn-info disabled">你已經登入了</div>}
    </main>
  );
}

'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import main from '@/assets/images/main.svg';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';


type LoginPageProps = {
  searchParams: {
    token: string;
  }
}


export default function LoginPage(props: LoginPageProps) {
  const tokenInput = useRef<HTMLInputElement>(null);
  const router = useRouter();


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
        const dialog = document.querySelector('dialog');
        if (dialog)
          dialog.showModal();
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

      <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold text-error">登入失敗！</h3>
        <p className="py-4">token 錯誤或者伺服器錯誤</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">關閉
            </button>
          </form>
        </div>
      </div>
    </dialog>
    </main>
  );
}

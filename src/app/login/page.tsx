'use client';

import Image from 'next/image';
import main from '@/assets/images/main.svg';


export default function LoginPage() {
  return (
    <main id="login" className="fullscreen flex justify-center items-center flex-col">
      <Image src={main} alt="main" />
      <div className="w-10/12 flex gap-x-3">
        <input
          type="text"
          placeholder="token"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button className="btn btn-info">送出</button>
      </div>
      
    </main>
  );
}

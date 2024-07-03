'use client';

import Image from 'next/image';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import init from '@/assets/images/init.svg';
import PageLink from '@/components/page_link';
import { postAuthenticated } from '@/lib/auth';
import { useEffect, useState } from 'react';


export default function ScannerPage() {
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('info');

  const handleScan = async ([result]: IDetectedBarcode[]) => {
    const raw = result.rawValue;

    setMessage('');
    setMessageColor('info');
    try {
      const response = await postAuthenticated('collect', { token: raw });
      if (response.status === 200) {
        setMessage('收集成功！');
        setMessageColor('success');
      }
      if (response.status === 201) {
        setMessage('已經收集過了！');
        setMessageColor('warning');
      }
      if (response.status === 202) {
        setMessage('未知的 QR code！');
        setMessageColor('error')
      }
    }
    catch (exception) {
      setMessage('系統錯誤！');
      setMessageColor('error');
    }
  }


  return <main className='fullscreen flex justify-center items-center flex-col p-5 gap-6 max-w-[500px] m-auto'>
    <PageLink href="/" text="回主頁" />
    <Image src={init} alt="main" />
    <Scanner
      styles={{
        container: {
          width: '90%',
          height: 'auto',
          aspectRatio: '1 / 1'
        }
      }}
      scanDelay={3000}
      onScan={handleScan}
    />
    <div className="badge-info badge-info badge-error badge-warning badge-success hidden" />
    {message !== '' && <div className={`badge badge-${messageColor} m-auto w-full h-10 mt-5 text-center`}>
        {message}<br />
    </div>}
  </main>
}
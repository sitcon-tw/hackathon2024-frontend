'use client';

import Image from 'next/image';
import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import init from '@/assets/images/init.svg';


export default function ScannerPage() {

  const handleScan = async ([result]: IDetectedBarcode[]) => {
    const raw = result.rawValue;

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_API}/collect`,
      { method: 'POST', body: JSON.stringify({ token: raw})}
    );
    const response = request.json();
    // TODO

  }


  return <main className='fullscreen flex justify-center items-center flex-col p-5 gap-6 max-w-[500px] m-auto'>
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
  </main>
}
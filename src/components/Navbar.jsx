'use client';

import Link from 'next/link';
import Image from 'next/image';
import BackgroundDark from "@/assets/bg-desktop-dark.jpg";

export default function Navbar() {

  return (
    <nav className=''>
        <div className="absolute top-0 left-0 right-0 h-[350px] -z-10">
          <Image
            src={BackgroundDark}
            alt="Background Dark"
            layout="fill"
            objectFit="cover"
            objectPosition='left'
          />
        </div>
        <div className="w-full max-w-[90%] mt-[50px] mx-auto px-[30px]">
            <div className='flex justify-between items-center mb-[30px] font-josefin'>
                <Link href="/" className="text-white text-[40px] ">
                  Task Manager
                </Link>
                <div className='flex space-x-6'>
                  <Link href="/login" className="">
                    Login
                  </Link>
                  <Link href="/register" className="">
                    Register
                  </Link>
              </div>
            </div>
        </div>
    </nav>
  );
}

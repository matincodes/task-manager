'use client';

import Link from "next/link";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../features/authSlice';
import { useRouter } from 'next/navigation';


export default function Register() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   const dispatch = useDispatch();
   const router = useRouter();

   const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ name, email, password, password_confirmation: confirmPassword }));
        if (registerUser.fulfilled.match(result)) {
          router.push('/');
        }
      };

  return (
    <div className="flex flex-col justify-center items-center z-10 text-white">
      <form onSubmit={handleSubmit} className="bg-customDark font-josefin p-6 rounded shadow-md w-[60%]">
            <h1 className="text-center text-3xl pb-4 font-josefin">Register</h1> 
            <input
                type="text"
                className="w-full p-2 my-2 bg-transparent outline-none border-b-2 text-lg"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />

            <input
                type="email"
                className="w-full p-2 my-2 bg-transparent outline-none border-b-2 text-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />

            <input
                type="password"
                className="w-full p-2 my-2 bg-transparent outline-none border-b-2 text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />

            <input
                type="password"
                className="w-full p-2 my-2 bg-transparent outline-none border-b-2 text-lg"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            <div className="">
                <button className="w-1/3 p-2 mt-8 bg-indigo-600 hover:bg-blue-600 rounded-lg">Register</button>
                <p className="mt-2 text-sm">
                    Already have an account? <Link href="/login" className="text-blue-400">Login</Link>
                </p>
            </div>
            
        </form>
    </div>
  );
}

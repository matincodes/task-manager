'use client'; 

import Link from "next/link";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/authSlice';
import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await dispatch(loginUser({ email, password }));
//     if (loginUser.fulfilled.match(result)) {
//       router.push('/');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
//       <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error.message}</p>}
//         <input
//           type="email"
//           className="w-full p-2 mb-2 bg-gray-700 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="w-full p-2 mb-2 bg-gray-700 rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded">
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <p className="mt-2 text-sm">
//           Don't have an account? <a href="/register" className="text-blue-400">Sign up</a>
//         </p>
//       </form>
//     </div>
//   );
// }


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        console.log(result);
        if (loginUser.fulfilled.match(result)) {
          router.push('/');
        }
      };

    return (
      <div className="flex flex-col justify-center items-center z-10 text-white mt-20">
        <form onSubmit={handleSubmit} className="bg-customDark font-josefin p-6 rounded shadow-md w-[60%]">
              <h1 className="text-center text-3xl pb-4 font-josefin">Login to your Account</h1> 
              {error && <p className="text-red-500">{error.message}</p>}
              <input
                  type="email"
                  className="w-full p-2 my-5 bg-transparent outline-none border-b-2 text-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
  
              <input
                  type="password"
                  className="w-full p-2 my-5 bg-transparent outline-none border-b-2 text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
  
              <div className="">
                  <button className="w-1/3 p-2 mt-8 bg-indigo-600 hover:bg-blue-600 rounded-lg">
                        {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <p className="mt-2 text-sm">
                      Don't have an account? <Link href="/register" className="text-blue-400">Register</Link>
                  </p>
              </div>
              
          </form>
      </div>
    );
  }
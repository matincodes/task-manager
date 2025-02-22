'use client';

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice"; 
import BackgroundDark from "@/assets/bg-desktop-dark.jpg";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <nav>
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0 h-[350px] -z-10">
        <Image
          src={BackgroundDark}
          alt="Background Dark"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
        />
      </div>

      {/* Navbar container */}
      <div className="w-full max-w-[90%] mt-[50px] mx-auto px-[30px]">
        <div className="flex justify-between items-center mb-[30px] font-josefin">
          {/* Logo or Title */}
          <Link href="/" className="text-white text-[40px]">
            Task Manager
          </Link>

          {/* Conditional Rendering based on auth */}
          {isAuthenticated ? (
            <div className="flex space-x-6 items-center">
              <span className="text-white">
                Welcome, <strong>{user?.name}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-6">
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

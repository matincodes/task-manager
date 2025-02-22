'use client';
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
          <Providers>
            <Navbar />
            {children}
          </Providers>
      </body>
    </html>
  );
}

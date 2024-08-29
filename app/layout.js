import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bow",
  description: "Bow app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <UserProvider>
      <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}

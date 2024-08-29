"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Home() {
  const user = useUser();
  const session = user.user?.sub ? true : false;
  return (
    <div>
      {!session ? (
        <a href="/api/auth/login">Login</a>
      ) : (
        <a href="/api/auth//logout">Logout</a>
      )}
      <br />
      <a href="/profile">Profile</a>
      <br />
      <a href="/gifts">Gifts</a>
    </div>
  );
}

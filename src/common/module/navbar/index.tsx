"use client";
import React from "react";
import Buttons from "../../component/Buttons";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status }: { data: any; status: string } = useSession();
  return (
    <div className="bg-neutral-800/90 py-5 gap-5 items-center flex justify-end px-10">
      <h1 className="text-white text-xl">{session?.user?.email}</h1>
      {status === "authenticated" ? (
        <>
          <Link
            href="/dashboard"
            className="text-white outline outline-[1px] px-5 py-3 rounded-xl"
          >
            Dashboard
          </Link>

          <Buttons
            onClick={signOut}
            className=""
            href=""
            icon=""
            icons=""
            title="Sign Out"
          />
        </>
      ) : (
        <div className="flex gap-5">
          <Buttons
            onClick={signIn}
            className=""
            href=""
            icon=""
            icons=""
            title="Sign In"
          />
          <Link
            href="/register"
            className="text-white outline outline-[1px] px-5 py-3 rounded-xl"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

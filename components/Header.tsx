"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { SessionInterface } from "@/common.types";
import Button from "./Button";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={115} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session as SessionInterface} />
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/create-project">Share Work</Link>
            </button>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Header;

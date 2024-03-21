"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import { useRouter } from "next/router";
// const router = useRouter();
const SigninButton = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    // Perform existing onClick logic here, if any
    // ...

    // Trigger Google sign-in
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  // if (session && session.user) {
  //   return (
  //     <div className="flex gap-4 ml-auto items-center">
  //       <p className="text-sky-600">{session.user.name}</p>
  //       <Image
  //         src={session.user.image ?? ""}
  //         alt={session.user.name ?? ""}
  //         className=" rounded-full"
  //         width={32}
  //         height={32}
  //       />
  //       <button onClick={() => signOut()} className="text-red-600">
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // }
  return (
    // <button onClick={() => signIn()} className="text-green-600 ml-auto">
    <>
      <div className="flex items-center justify-center w-full dark:bg-gray-800 ">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 flex justify-center border w-full h-full flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Continue with Google</span>
        </button>
      </div>

      {/* <button onClick={handleSignIn} className="text-green-600 ml-auto">
        Sign In
      </button> */}
    </>
  );
};

export default SigninButton;

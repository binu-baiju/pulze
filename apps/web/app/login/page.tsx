import * as React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "ui/lib/utils";

//import { buttonVariants } from "@/registry/new-york/ui/button"
import { UserAuthForm } from "./components/user-auth-form";
import {
  // Avatar,
  // AvatarFallback,
  // AvatarImage,
  buttonVariants,
  Button,
  Header,
  Heading,
} from "ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../packages/ui/components/avatar";
import { ForgetPassword } from "./components/forgetPassword";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
import CaughtIcon from "../../icons/FigmaIcon";

const LogIn = () => {
  return (
    <div className="bg-[#F5F3FF] flex flex-col justify-center items-center h-screen">
      <div className="LoginContainer">
        <div className="flex flex-col border-1 border-inherit bg-white w-[450px] h-[450px] justify-center items-center mt-8">
          <div className="absolute top-12">
            <CaughtIcon />
          </div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight py-4">
                Login
              </h1>
            </div>
            <UserAuthForm />
            <button className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl">
              Continue with email
            </button>
            <div className="ml-[70px]">
              <p className="px-8 text-center text-xs text-muted-foreground font-poppins font-light">
                Not on pulze yet?
                <Link
                  href="../signup"
                  className="text-[#8B5CF6] font-bold font-[Inter] text-xs"
                >
                  Signup
                </Link>{" "}
                <ForgetPassword />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-semibold font-[Inter] text-[32px] pt-8">pulze</h1>
      </div>
    </div>
  );
};

export default LogIn;

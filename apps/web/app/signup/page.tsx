import * as React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "ui/lib/utils";
import SignUpPAgeImage from "../../icons/SignUpPageImage";

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

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

const App: React.FunctionComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-full w-[45%] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  w-[400px] h-[450px] mt-[80px]">
          <h1 className="font-semibold font-[Inter] sm:text-[33px] text-center">
            Visually Rich sync conversations - free forever
          </h1>
          <div className=" w-[400px] h-[450px] mt-[100px] items-center">
            <UserAuthForm />
            <button className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl w-full mb-2">
              Continue with email
            </button>
            <div className="ml-[0px]">
              <p className=" text-center text-xs text-muted-foreground font-poppins font-light">
                Have an account?
                <Link
                  href="../login"
                  className="text-[#8B5CF6] font-bold font-[Inter] text-xs"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-[55%] relative">
        <SignUpPAgeImage className="max-w-full max-h-full mr-[100px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white mt-[20px] w-[540px] h-[450px]">
          <p className="font-semibold font-[Inter] text-[48px] tracking-wide ">
            "Amazing tool to help collaborate with the team async. Very valuable
            especially in the remote-first times today!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

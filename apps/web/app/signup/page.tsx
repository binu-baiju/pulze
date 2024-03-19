import * as React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "ui/lib/utils";
import SignUpPAgeImage from "../../icons/SignUpPageImage";
import SignUpIcon from "../../icons/SignupIcon_1.png";
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
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex-1 h-full flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center max-w-[400px] max-h-[450px]">
          <h1 className="font-semibold font-[Inter] sm:text-[33px] text-center">
            Visually Rich sync conversations - free forever
          </h1>
          <div className=" w-[450px] h-[450px] mt-2 items-center">
            <UserAuthForm />
            <button className="font-exbold bg-[#8645FF] h-10 text-[#F3E8FF] rounded-lg text-xl w-full mb-2">
              Continue with email
            </button>
            <div className="">
              <p className="text-center text-xs text-muted-foreground font-poppins font-light">
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
      <div className="flex-1 h-fit max-md:hidden">
        <Image src={SignUpIcon} alt="fireSpot" />
      </div>
    </div>
  );
};

export default App;

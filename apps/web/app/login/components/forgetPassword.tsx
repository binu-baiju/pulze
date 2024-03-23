"use client";
import prisma from "../../lib/prisma";
// import formData from "form-data";
// import Mailgun from "mailgun.js";
// import { redirect } from "next/navigation";
// import { randomUUID } from "crypto";

// const API_KEY = process.env.MAILGUN_API_KEY || "";
// const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || "";
// const DOMAIN = process.env.DOMAIN || "localhost:3000";
// const PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http";

import { Button } from "ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { Input } from "ui/components/input";
import { Label } from "ui/components/label";
import FlaggIcon from "../../../icons/FlaggIcon";
import { useState } from "react";
import { resetPassword } from "./_actions";
import Link from "next/link";

export function ForgetPassword() {
  const [error, setError] = useState<string>("");
  const submit = async (data: FormData) => {
    console.log("entered submit");

    const response = await resetPassword(data);
    if (response && response.error) {
      setError(response.error); // Set error only if it exists in the response
      console.log(response.error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a href="#" className="text-[#8B5CF6] font-bold font-[Inter] text-xs">
          <div className="font-bold">Forget Password</div>
        </a>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
        {/* <DialogHeader>
          <div className="scale-50 mt-[-30px]">
            <FlaggIcon />
          </div>
          <DialogTitle className="font-poppins font-bold ml-[30px] text-2xl absolute top-[150px]">
            Forget Password
          </DialogTitle>
        </DialogHeader>
        <form
          action={submit}
          className="sm:max-w-[425px] flex flex-col justify-center items-center"
        >
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4 ml-[12px]">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="col-span-3 w-[355px]"
              />
            </div>
          </div>
          <DialogFooter className=" items-center">
            <Button
              type="submit"
              className="bg-[#8645FF] hover:bg-[#8645FF] w-[360px] rounded-r-md font-[Inter] font-semibold text-xl"
            >
              Send
            </Button>
          </DialogFooter>
        </form> */}
        <DialogHeader>
          <div className="scale-50 mt-[-30px]">
            <FlaggIcon />
          </div>
          <DialogTitle className="font-poppins font-bold ml-[30px] text-2xl absolute top-[150px]">
            Forget Password
          </DialogTitle>
        </DialogHeader>
        <form action={submit} className="flex flex-col gap-4">
          {/* <h1 className="text-2xl font-light">Reset password</h1>
          <p>
            Enter your email address to get instructions for resetting your
            password.
          </p> */}
          <Input name="email" type="email" placeholder="Enter your Email" />
          {error && <p className="text-red-500">{error}</p>}
          <Button className="bg-[#8645FF] w-[320px]">Reset Password</Button>
          <Link
            href="/login"
            className="text-sm flex  justify-center items-center"
          >
            {/* <CaretLeftIcon /> */}
          </Link>
        </form>
      </DialogContent>
    </Dialog>
  );
}

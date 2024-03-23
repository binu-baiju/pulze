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
import { FaPlus } from "react-icons/fa";
import { signOut } from "next-auth/react";
export function LogOutPopUp() {
  const logOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[poppins] cursor-pointer font-light text-xs text-left justify-start items-center m-1 text-[#DC2626]">
          Logout
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[345px] flex flex-col justify-center items-center rounded-lg border border-slate-500">
        <DialogHeader>
          <div className="scale-50 justify-center ml-6 mt-[-60px]">
            <FlaggIcon />
          </div>
          <DialogTitle className="flex font-[Inter] font-semibold justify-center items-center text-3xl mt-[-20px]">
            pulze
          </DialogTitle>
          <DialogDescription className="font-poppins font-medium text-xl text-center text-[#4B5563] py-4">
            You can log back at any time
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-8 justify-center items-center">
          <Button
            type="submit"
            className="bg-[#D4D4D8] hover:bg-[#D4D4D8] w-28 rounded-r-md font-[Inter] font-semibold text-base text-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#8645FF] hover:bg-[#8645FF] w-28 rounded-r-md font-[Inter] font-semibold text-base"
            onClick={logOut}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

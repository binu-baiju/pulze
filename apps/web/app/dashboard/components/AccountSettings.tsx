import { Button } from "ui/components/button";
import { BsPersonAdd } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { AvatarDemo } from "./avatar";

export function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[poppins] font-light text-xs text-left justify-center items-center m-1 text-[#0F172A]">
          Settings
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full flex flex-col justify-between items-start border border-slate-500">
        <DialogHeader>
          <DialogTitle className="flex font-[Inter] font-semibold justify-start text-lg">
            Profile
          </DialogTitle>
          <DialogDescription className="font-poppins font-medium text-xl text-center text-[#4B5563] py-4">
            <div className="flex flex-row items-center mt-10">
              <div className="scale-[5] ml-10">
                <AvatarDemo />
              </div>
              <button className="flex flex-row items-center justify-center mx-12">
                <BsPersonAdd className="text-black text-3xl mx-2" />
                <span className="font-[poppins] text-sm font-normal text-black">
                  Upload profile photo
                </span>
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold font-[poppins]">Name</p>
            <p className="flex grow text-sm font-normal font-[poppins] ml-2">
              Binu Baiju
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold font-[poppins]">Email</p>
            <input
              className="flex grow text-sm font-normal font-[poppins] border-2 ml-2 w-[600px] border-2"
              placeholder="email"
              type="email"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-8 justify-center items-center mb-44">
          <Button
            type="submit"
            className="bg-[#8645FF] hover:bg-[#8645FF] w-40 h-30 rounded-r-md font-[Inter] font-semibold text-lg"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

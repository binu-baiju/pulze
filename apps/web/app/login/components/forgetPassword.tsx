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

export function ForgetPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a href="#" className="text-[#8B5CF6] font-bold font-[Inter] text-xs">
          <div className="font-bold">Forget Password</div>
        </a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
        <DialogHeader>
          <div className="scale-50 mt-[-30px]">
            <FlaggIcon />
          </div>
          <DialogTitle className="font-poppins font-bold ml-[30px] text-2xl absolute top-[150px]">
            Forget Password
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4 ml-[12px]">
            <Input
              id="email"
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
      </DialogContent>
    </Dialog>
  );
}

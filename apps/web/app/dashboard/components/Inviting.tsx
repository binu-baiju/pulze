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
import { MdGroupAdd } from "react-icons/md";

export function Inviting() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
          <MdGroupAdd className="ml-1 mr-1" />
          Invite Coworkers
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center rounded-lg border border-slate-500  min-w-[500px] min-h-[300px] ">
        <DialogHeader>
          <DialogTitle className="font-poppins items-start font-bold ml-[30px] mx-0 text-2xl text-lg">
            Invite co-workers by email
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col  gap-20 mt-10">
          <div className="flex flex-row place-content-between ">
            <Input
              id="name"
              placeholder="Enter name or email"
              className="w-[300px]"
            />
            <Button
              type="submit"
              className="bg-[#8645FF] hover:bg-[#8645FF] w-[120px] rounded-r-md font-[Inter] font-semibold text-lg"
            >
              Send
            </Button>
          </div>
          <div className="flex flex-row place-content-between items-center">
            <span className="text-[#474545] text-poppins text-sm font-light">
              Anyone with the link can join the pulse
            </span>
            <Button
              type="submit"
              className="text-white bg-[#8645FF] w-[120px] rounded-r-md font-[Inter] font-semibold text-lg"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

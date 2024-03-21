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

export function CreatingWorkspace() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Inter] font-normal text-sm text-left justify-center items-center m-1">
          <FaPlus className="mx-1.5" />
          New Workspace
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center rounded-lg border border-slate-500">
        <DialogHeader>
          <div className="scale-50 mt-[-30px] ml-[70px] ">
            <FlaggIcon />
          </div>
          <DialogTitle className="font-poppins  font-bold ml-[70px] text-2xl absolute top-[150px]">
            Name your workspace
          </DialogTitle>
          <DialogDescription className="font-poppins font-normal text-xl text-center">
            A workspace is shared home for you andyour coworkers to collaborate
            on pulze
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4 ml-[12px]">
            <Input
              id="name"
              placeholder="Workspace name"
              className="col-span-3 w-[355px]"
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            type="submit"
            className="bg-[#8645FF] hover:bg-[#8645FF] w-[360px] rounded-r-md font-[Inter] font-semibold text-xl"
          >
            Create Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

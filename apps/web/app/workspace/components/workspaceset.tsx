import { Button } from "ui/components/button";
import { AvatarDemo } from "../../dashboard/components/avatar";
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
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

export function WorkSpaceSet() {
  const [tab, setTab] = useState(1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
          <IoMdSettings className="ml-1" />
          Workspace Settings
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center rounded-lg border border-slate-500  min-w-[500px] min-h-[300px] ">
        <DialogHeader>
          <DialogTitle className="font-poppins items-start font-bold ml-[30px] mx-0 text-2xl text-lg">
            Workspace Settings
          </DialogTitle>
        </DialogHeader>
        {/* <div className="flex flex-col gap-20 mt-10">
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
        </div> */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-start cursor-pointer text-lg font-semibold border-b-2 border-slate-700">
            <div
              className={
                tab == 1
                  ? "mx-2 border-b-2 border-indigo-700"
                  : "mx-2 font-normal"
              }
              onClick={() => setTab(1)}
            >
              General
            </div>
            <div
              className={
                tab == 2
                  ? "mx-2 border-b-2 border-indigo-700"
                  : "mx-2 font-normal"
              }
              onClick={() => setTab(2)}
            >
              Members
            </div>
          </div>
          <div>
            <div>
              {tab == 1 && (
                <div className="mt-2">
                  <div className="mt-2">
                    <div className="font-semibold">Workspace Name</div>
                    <div className="flex flex-row w-full justify-between mt-4">
                      <div>
                        <Input
                          id="workspace_name"
                          placeholder="Enter your workspace name"
                          className="w-[300px]"
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="text-white bg-[#8645FF] rounded-r-md font-[Inter] font-semibold text-lg w-[120px]"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="font-semibold">Join Link</div>
                    <div className="flex flex-row w-full justify-between mt-4">
                      <div>
                        <Input
                          id="workspace_link"
                          value={"www.pulze.com"}
                          className="w-[300px]"
                          disabled
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="text-white bg-[#8645FF] rounded-r-md font-[Inter] font-semibold text-lg w-[120px]"
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-8 flex-wrap">
                    <Button
                      type="submit"
                      className="text-white bg-[#DC2626] rounded-r-md font-[Inter] font-semibold text-lg w-[200px]"
                    >
                      Leave Workspace
                    </Button>
                    <Button
                      type="submit"
                      className="text-white bg-[#DC2626] rounded-r-md font-[Inter] font-semibold text-lg w-[200px]"
                    >
                      Delete Workspace
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div>
              {tab == 2 && (
                <div>
                  <div className="pl-4">
                    <h3 className="font-medium font-poppins text-lg font-semibold text-[#000000] capitalize mt-4">
                      1 Member
                    </h3>
                    <div className="flex flex-row mt-6 items-center w-full justify-between">
                      <div className="flex flex-row items-center">
                        <div className="scale-[2]">
                          {" "}
                          <AvatarDemo />
                        </div>
                        <div className="flex flex-col ml-4">
                          <p className="font-semibold font-poppins text-lg">
                            Binu Baiju
                          </p>
                          <p className="font-normal font-poppins  text-xs text-[#474545] tracking-wider">
                            binubaiju@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="font-semibold font-poppins text-base">
                        <p>Admin</p>
                      </div>
                    </div>
                    <div className="flex flex-row mt-6 items-center w-full justify-between">
                      <div className="flex flex-row items-center">
                        <div className="scale-[2]">
                          {" "}
                          <AvatarDemo />
                        </div>
                        <div className="flex flex-col ml-4">
                          <p className="font-semibold font-poppins text-lg">
                            Binu Baiju
                          </p>
                          <p className="font-normal font-poppins  text-xs text-[#474545] tracking-wider">
                            binubaiju@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="font-semibold font-poppins text-base">
                        <p>Admin</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

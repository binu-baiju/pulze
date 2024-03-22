"use client";
import { Link, Send, UserPlus } from "lucide-react";
import { title } from "process";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "ui";
import { BorderLessInput } from "ui/components/borderlessinput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import AutoComplete from "./Autocomplete";

import { User as UserType } from "../../../types";

export const ReadyToShareDialog = (videosrc) => {
  console.log("videosrc in ReadyShrae", videosrc.videosrc);

  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSelectedUsersChange = (users: UserType[]) => {
    // Handle the selected users in the parent component
    setSelectedUsers(users);
    console.log("selected Users in parent:", selectedUsers);
    setSelectedUsers((prevUsers) => {
      console.log("Previous selected users:", prevUsers);
      console.log("New selected users:", users);
      return users; // Set the state to the new users
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleChildClick = (e) => {
    // Prevent event propagation
    e.stopPropagation();

    // e.preventDefault();

    // Open dialog or perform other actions
    // console.log('Dialog opened!');
  };

  const handleCloseButtonClick = (e) => {
    e.stopPropagation();
    // Add logic to close the dialog here
  };
  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleChildClick}>
        <button className="flex hover:bg-violet-200 group">
          <UserPlus size={16} className="group-hover:text-violet-400" />
          <p className="font-normal font-poppins mt-1 pl-2 text-[9px] text-[#474545] tracking-wider group-hover:text-violet-400">
            Ready to share
          </p>
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]  flex flex-col justify-center  "
        onClick={handleCloseButtonClick}
      >
        <DialogHeader className="">
          <DialogTitle className="">
            <span className="font-normal ">New Pulze in </span>
            <span className="font-semibold">Binu Baiju's team</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid  gap-4  ">
          <div className="grid grid-cols-10 items-center justify-start  ">
            {/* <Label htmlFor="username" className="text-center  ml-3">
To:
</Label> */}
            {/* To: */}
            {/* <label className=" bg-green-500 ml-5">To:</label> */}
            {/* <Input
id="username"
defaultValue="@peduarte"
readOnly
className="col-span-9 border-none focus:outline-none ring-0 text-left"
/> */}
            <div className="border rounded-md  focus:outline-none  flex justify-start col-span-10  w-full bg-gray-100 ">
              {/* <AutoComplete
                onSelectedUsersChange={handleSelectedUsersChange}
                onStateChange={handleDateFieldState}
                setDateFieldState={function (
                  value: React.SetStateAction<DateFieldState | null>
                ): void {
                  throw new Error("Function not implemented.");
                }}
                dateFieldState={null}
                formattedHours={undefined}
              /> */}

              {/* <input
type="email"
// value={recipient}
// onChange={handleInputChange}
className="bg-transparent outline-none border-none p-0 ml-1  "
placeholder="Type a name or email"
/> */}
            </div>
            {/* <Button onClick={handleUsers}>Hello</Button> */}
          </div>
          <div className="flex flex-col gap-0">
            <BorderLessInput
              className="font-semibold pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none text-slate-950"
              placeholder="Untitled Pulze"
              value={title}
              onChange={handleTitleChange}
            />
            <BorderLessInput
              className="pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none"
              placeholder="Type a message"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="bg-gray-100 h-full rounded-lg  w-full ">
          <>
            <video
              src={videosrc.videosrc}
              controls
              autoPlay
              playsInline
              // style={{ width: "40%" }}
              className="w-full"
            ></video>
            <Button
            // onClick={() => handleResultsrc(resultVideosrccontext)}
            >
              Src
            </Button>
            <div className="flex justify-between  w-full mt-2">
              <Button
                className=" flex w-2/5 justify-center gap-1 text-violet-600 hover:text-violet-600 border border-violet-600 bg-transparent mb-3 "
                variant="outline"
              >
                <Link size={20} />
                Copy Link
              </Button>
              <Button
                className=" flex w-2/5 justify-center gap-1 bg-violet-600 border border-violet-600 hover:bg-violet-700 mb-3 "
                // onClick={handleSendVideo}
              >
                <Send size={20} />
                Send
              </Button>
            </div>
          </>
        </div>

        {/* <DialogFooter>hwhud</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

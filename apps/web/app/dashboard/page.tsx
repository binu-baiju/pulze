// dashboard.tsx

import React, { useState } from "react";

import { Button } from "ui/components/button";
import { Sidebar } from "ui/components/sidebar";
import { Input } from "ui/components/input";
import { BorderLessInput } from "ui/components/borderlessinput";
import { Icons } from "ui/components/icons";
import { Label } from "ui/components/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  X,
  DialogOverlay,
} from "ui/components/dialog";

// import { Popover } from "ui/components/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown";
import ToggleButton from "./components/toggleButton";
import ActivityPage from "./sideComponents/ActivityComponent";
import MyPulzePage from "./sideComponents/MyPulzeComponent";
const Dashboard = () => {
  return (
    <div className="bg-slate-100 h-screen w-screen flex">
      <div className="h-screen bg-gray-200 w-1/4 lg:w-2/12">
        <h1 className="mt-2 ml-5 font-bold">pulze</h1>
        <div className=" mt-5 flex flex-col justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 mx-4 " size="lg">
                New Pulze
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  flex flex-col justify-center  ">
              <DialogHeader className="">
                <DialogTitle className="">
                  <span className="font-normal bg-indigo-600">
                    New Pulze in{" "}
                  </span>
                  <span className="font-semibold">Binu Baiju's team</span>
                </DialogTitle>
              </DialogHeader>

              <div className="grid  gap-4  ">
                <div className="grid grid-cols-10 items-center justify-start ">
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

                  <div className="border rounded-md p-2 focus:outline-none  flex justify-start col-span-10  w-full bg-gray-100">
                    <b>To: </b>
                    <input
                      type="email"
                      // value={recipient}
                      // onChange={handleInputChange}
                      className="bg-transparent outline-none border-none p-0 ml-1  "
                      placeholder="Type a name or email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-0">
                  <BorderLessInput
                    className="font-semibold pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none"
                    placeholder="Untitled Pulze"
                  />
                  <BorderLessInput
                    className="pl-0 border-none focus:border-none focus:ring-0 focus:outline-none outline-none"
                    placeholder="Type a message"
                  />
                </div>
              </div>
              <div className="bg-gray-100 h-96 rounded-lg  w-full ">
                <Tabs defaultValue="account" className="w-full  h-full  ">
                  <TabsList className="flex justify-around gap-2 bg-white focus:bg-gray-100">
                    <TabsTrigger
                      value="screen"
                      className=" w-1/3 focus:bg-gray-900 flex gap-3 justify-center items-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M30 2.994h-28c-1.099 0-2 0.9-2 2v17.006c0 1.099 0.9 1.999 2 1.999h13v3.006h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3.006h13c1.099 0 2-0.9 2-1.999v-17.006c0-1.1-0.901-2-2-2zM30 22h-28v-17.006h28v17.006z"></path>{" "}
                        </g>
                      </svg>
                      <p className="text-sm mb-1">Screen </p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="camera"
                      className="  w-1/3 focus:bg-red-500 flex gap-3"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      Camera
                    </TabsTrigger>
                    <TabsTrigger
                      value="upload"
                      className="  w-1/3 ring-0 focus-visible:bg-red-500 flex gap-3 focus:ring-0"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                        strokeWidth="19.456"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M763.024 259.968C718.4 141.536 622.465 66.527 477.553 66.527c-184.384 0-313.392 136.912-324.479 315.536C64.177 410.495.002 501.183.002 603.903c0 125.744 98.848 231.968 215.823 231.968h92.448c17.664 0 32-14.336 32-32 0-17.68-14.336-32-32-32h-92.448c-82.304 0-152.832-76.912-152.832-167.968 0-80.464 56.416-153.056 127.184-165.216l29.04-5.008-2.576-29.328-.24-.368c0-155.872 102.576-273.44 261.152-273.44 127.104 0 198.513 62.624 231.537 169.44l6.847 22.032 23.056.496c118.88 2.496 223.104 98.945 223.104 218.77 0 109.055-72.273 230.591-181.696 230.591h-73.12c-17.664 0-32 14.336-32 32 0 17.68 14.336 32 32 32l72.88-.095c160-4.224 243.344-157.071 243.344-294.495 0-147.712-115.76-265.744-260.48-281.312zM535.985 514.941c-.176-.192-.241-.352-.354-.512l-8.095-8.464c-4.432-4.688-10.336-7.008-16.24-6.976-5.905-.048-11.777 2.288-16.289 6.975l-8.095 8.464c-.16.16-.193.353-.336.513L371.072 642.685c-8.944 9.344-8.944 24.464 0 33.84l8.064 5.471c8.945 9.344 23.44 6.32 32.368-3.024l68.113-75.935v322.432c0 17.664 14.336 32 32 32s32-14.336 32-32V603.34l70.368 77.631c8.944 9.344 23.408 12.369 32.336 3.025l8.064-5.472c8.945-9.376 8.945-24.496 0-33.84z"></path>
                        </g>
                      </svg>
                      Upload
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="screen"
                    className="flex flex-col justify-between items-center  h-5/6"
                  >
                    Make changes to your account here.
                    <div className="flex flex-col items-start w-full ml-9 gap-3">
                      <ToggleButton
                        icon1={<Icons.audioOn />}
                        icon2={<Icons.audioOff />}
                      />
                      <ToggleButton
                        icon1={<Icons.audioOn />}
                        icon2={<Icons.audioOff />}
                      />
                      <div className=" w-11/12">
                        <Button className="w-full">hghg</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="camera" className="flex justify-center">
                    Change your password here.
                    <ToggleButton
                      icon1={<Icons.audioOn />}
                      icon2={<Icons.audioOff />}
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="flex justify-center">
                    Change your password here.
                  </TabsContent>
                </Tabs>
                <div className=""></div>
              </div>

              {/* <DialogFooter>hwhud</DialogFooter> */}
            </DialogContent>
          </Dialog>

          {/* <!-- Modal toggle   */}

          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 bg-white mx-4 rounded-md h-9 flex justify-center items-center">
              binubaiju's{"teams"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mt-1"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Sidebar />
      </div>
      <div className="grow">
        {/* <ActivityPage /> */}
        <MyPulzePage />
      </div>
      {/* <div className="flex items-center justify-center h-screen">
        <div className="text-center mt-[-30vh]">
          <p className="font-bold mb-0 text-indigo-500">
            You are all caught up
          </p>
          <p className="text-indigo-500 text-xs my-0">New pulze</p>
        </div>
      </div> */}
      {/* <Popover /> */}
    </div>
  );
};

export default Dashboard;

"use client";
import React, { useEffect, useRef, useState } from "react";
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
import ToggleButton from "./toggleButton";
import { Button } from "ui/components/button";
import { BorderLessInput } from "ui/components/borderlessinput";
import { DatePickerWithPresets } from "ui/components/datepicker";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import { Icons } from "ui/components/icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "ui/components/command";

import DropdownMenuTeams from "./DropdownMenuTeams";
import { AutoComplete, Option } from "./autocomplete";
const VideoRecorderCompleted = ({ recordedVideoLink }) => {
  const [isTyping, setIsTyping] = useState(false);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; email: string }[]
  >([]);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [value, setValue] = useState<Option>();
  const FRAMEWORKS = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
    {
      value: "wordpress",
      label: "WordPress",
    },
    {
      value: "express.js",
      label: "Express.js",
    },
    {
      value: "nest.js",
      label: "Nest.js",
    },
  ];

  const emptyMessage = "No options available";

  const handleValueChange = (selectedOption) => {
    // Handle the selected option
    console.log("Selected Option:", selectedOption);
  };
  // const OutsideClickListener = ({ onOutsideClick, children }) => {
  //     const wrapperRef = useRef(null);

  //     const handleClickOutside = (event) => {
  //       if (wrapperRef.current && !(wrapperRef.current as any).contains(event.target)) {
  //         onOutsideClick();
  //       }
  //     };

  // useEffect(() => {
  //     // document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [wrapperRef, handleClickOutside]);

  //   return <div ref={wrapperRef}>{children}</div>;
  // };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const fetchSuggestions = async (searchQuery) => {
    const response = await fetch(
      `http://localhost:8080/api/videorecordercompleted/search?query=${searchQuery}`
    );
    const data = await response.json();
    // setSuggestions(data.suggestions);
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500); // Set your debounce delay

  // const handleInputChange = (e) => {
  //   const newQuery = e.target.value;
  //   setQuery(newQuery);

  //   debouncedFetchSuggestions(newQuery);
  // };
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Simulate fetching suggestions
    // Replace this with your actual API call
    const mockSuggestions = [
      { id: "1", email: "user1@example.com" },
      { id: "2", email: "user2@example.com" },
      // Add more suggestions as needed
    ];
    setSuggestions(mockSuggestions);
    debouncedFetchSuggestions(newQuery);
  };
  // Add an event handler to detect typing
  const handleTyping = () => {
    setIsTyping(!isTyping);
  };

  const closeCommandList = () => {
    setIsTyping(false);
  };

  // const handleSelectEmail = (selectedEmail) => {
  //   // Use ref to get the input element
  //   const inputElement = emailInputRef.current;

  //   if (inputElement) {
  //     inputElement.value = selectedEmail;
  //     setIsTyping(false); // Close the suggestion list after selecting
  //   }
  // };
  return (
    // <ApolloProvider client={client}>
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-10 mx-4 " size="lg">
              New Pulze
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] flex flex-col justify-center">
            <DialogHeader className="">
              <DialogTitle className="flex mb-2 items-start ">
                <span className="font-poppins text-xs">New Pulze in</span>
                <span className="font-semibold mb-2 mr-">
                  <DropdownMenuTeams />
                </span>
              </DialogTitle>
              {/* <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription> */}
            </DialogHeader>

            <div className="grid gap-4">
              <div className="flex gap-2 flex-cols-10 items-center justify-start relative">
                <div className="border rounded-md p-1 focus:outline-none flex justify-start items-center col-span-10 w-full bg-gray-200">
                  <div>
                    <b className="mb-2">To: </b>
                    <AutoComplete
                      options={FRAMEWORKS}
                      emptyMessage="No resulsts."
                      placeholder="Find something"
                      isLoading={isLoading}
                      onValueChange={setValue}
                      value={value}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="relative">
                    {/* <OutsideClickListener onOutsideClick={closeCommandList}> */}

                    {/* </OutsideClickListener> */}
                  </div>
                </div>
                <div className="col-span-12 bg-red-500 flex-3 items-center border rounded-md p-1 focus:outline-none bg-gray-200">
                  {/* Respond by <DatePickerWithPresets/> */}
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
          </DialogContent>
        </Dialog>
      </div>
    </div>

    // </ApolloProvider>
  );
};

export default VideoRecorderCompleted;

//   <div className="bg-gray-100 h-96 rounded-lg w-full">
//       <Tabs defaultValue="account" className="w-full h-full">
//         <TabsList className="flex justify-around gap-2 bg-white focus:bg-gray-100">
//           {/* ... (TabsTrigger components) */}
//         </TabsList>
//         <TabsContent
//           value="screen"
//           className="flex flex-col justify-between items-center h-5/6"
//         >
//           {/* ... (TabsContent for 'screen') */}
//         </TabsContent>
//         <TabsContent value="camera" className="flex justify-center">
//           {/* ... (TabsContent for 'camera') */}
//         </TabsContent>
//         <TabsContent value="upload" className="flex justify-center">
//           {/* ... (TabsContent for 'upload') */}
//         </TabsContent>
//       </Tabs>
//       <div className=""></div>
//     </div>

// {/* <div className="grid grid-cols-10 items-center justify-start">
//         <div className="border rounded-md p-2 focus:outline-none flex justify-start col-span-10 w-full bg-gray-100">
//           <b>To: </b>
//           {/* <input
//             type="email"
//             // value={recipient}
//             // onChange={handleInputChange}
//             className="bg-transparent outline-none border-none p-0 ml-1 "
//             placeholder="Type a name or email"
//           /> */}
//           <Command>
//   <CommandInput placeholder="Type a command or search..."  onClick={handleTyping} />
//   <CommandList>
//   {isTyping && (
//     <>
//       <CommandEmpty>No results found.</CommandEmpty>
//       <CommandGroup heading="Suggestions">
//         <CommandItem>Calendar</CommandItem>
//         <CommandItem>Search Emoji</CommandItem>
//         <CommandItem>Calculator</CommandItem>
//       </CommandGroup>
//       <CommandSeparator />
//       <CommandGroup heading="Settings">
//         <CommandItem>Profile</CommandItem>
//         <CommandItem>Billing</CommandItem>
//         <CommandItem>Settings</CommandItem>
//       </CommandGroup>
//     </>
//   )}
//   </CommandList>
// </Command>

//         </div>
//       </div> */}

{
  /* <Command className="bg-gray-200 pr-">
<CommandInput
ref={emailInputRef}
  className="text-left"
  placeholder="Enter email or emails"
  onClick={handleTyping}
  value={query}
  
  onChangeCapture={handleInputChange}
/>
<CommandList className="bg-white">
  {/* {isTyping && ( */
}
//     <>
//       <CommandEmpty>No results found.</CommandEmpty>
//       <CommandGroup heading="Suggestions">
//       {suggestions.map((user) => (
// <CommandItem id={user.id} onSelectCapture={() => handleSelectEmail(user.email)}>{user.email}</CommandItem>
// ))}

//       </CommandGroup>
//       <CommandSeparator />
//       <CommandGroup heading="Settings">
//         <CommandItem>Profile</CommandItem>
//         <CommandItem>Billing</CommandItem>
//         <CommandItem>Settings</CommandItem>
//       </CommandGroup>
//     </>
//   {/* )} */}
// </CommandList>
// </Command> */}

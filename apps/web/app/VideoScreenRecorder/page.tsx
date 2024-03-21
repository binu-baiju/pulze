"use client";
import React, { useRef, useState } from "react";
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
// import { Player } from "video-react";
// import "video-react/dist/video-react.css";
// import { S3Upload } from "./Utils";
import dynamic from "next/dynamic";
const VideoScreenRecorder = dynamic(
  () => import("./components/VideoScreenRecorderRest"),
  { ssr: false }
);
const VideoAndAudioRecorder = dynamic(
  () => import("./components/VideoAndAudioRecorder"),
  { ssr: false }
);
const ScreenAndAudioRecorder = dynamic(
  () => import("./components/ScreenAndAudioRecrding"),
  { ssr: false }
);

// import client from "../components/apolloClient";
import { ApolloProvider } from "@apollo/client";
// import HelloMessage from "../components/HelloMessage.jsx";
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
import ToggleButton from "./components/toggleButton";
import { Button } from "ui/components/button";
// import { DatePickerWithPresets } from "ui/components/datepicker";

import { BorderLessInput } from "ui/components/borderlessinput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import VideoRecorderCompleted from "./components/VideoRecorderCompleted";
import { CommandMenu } from "./components/commandMenu";
import { AutoComplete } from "./components/autocomplete";
// import MyTabs from "../dashboard/components/tabs";
// const MyTabs = dynamic(() => import("../dashboard/components/tabs"), {
//   ssr: false,
// });
type Option = Record<"value" | "label", string> & Record<string, string>;
const MyPage = () => {
  const [recordedVideoLink, setRecordedVideoLink] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);

  const [value, setValue] = useState<Option>();

  // Function to set the recorded data
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
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

  return (
    // <ApolloProvider client={client}>
    <div
      style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
    >
      <div>
        {/* <HelloMessage/> */}
        {/* <VideoScreenRecorder onRecordingComplete={handleRecordingComplete} /> */}
        hello
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
      <div>
        <VideoRecorderCompleted recordedVideoLink={recordedVideoLink} />
      </div>
      <div>
        <CommandMenu />
        <DatePickerWithPresets />
        {/* <VideoAndAudioRecorder />
        <ScreenAndAudioRecorder /> */}
      </div>
      <div>{/* <MyTabs /> */} </div>
    </div>
    // </ApolloProvider>
  );
};

export default MyPage;

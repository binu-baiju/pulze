 "use client";
import React, { useRef, useState } from "react";
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
// import { Player } from "video-react";
// import "video-react/dist/video-react.css";
// import { S3Upload } from "./Utils";
import dynamic from 'next/dynamic';
const VideoScreenRecorder = dynamic(() => import('./components/VideoScreenRecorderRest'), { ssr: false });

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
import { BorderLessInput } from "ui/components/borderlessinput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/components/tabs";
import VideoRecorderCompleted from "./components/VideoRecorderCompleted";
import { CommandMenu } from "./components/commandMenu";
const MyPage = () => {
  const [recordedVideoLink, setRecordedVideoLink] = useState(null);

  // Function to set the recorded data
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
  return (
    // <ApolloProvider client={client}>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
        <div>
          {/* <HelloMessage/> */}
          <VideoScreenRecorder onRecordingComplete={handleRecordingComplete} />
          hello
        </div>
        <div>
          <VideoRecorderCompleted recordedVideoLink={recordedVideoLink}/>
        </div>
        <div>
          <CommandMenu/>
        </div>
       
        

      </div>
    // </ApolloProvider>
  );
};

export default MyPage;
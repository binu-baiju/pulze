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
const MyPage = () => {
  return (
    // <ApolloProvider client={client}>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <div>
          {/* <HelloMessage/> */}
          <VideoScreenRecorder />
          hello
        </div>
      </div>
    // </ApolloProvider>
  );
};

export default MyPage;
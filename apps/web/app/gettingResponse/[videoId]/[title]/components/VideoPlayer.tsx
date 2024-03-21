"use client";
import React, { useRef, useEffect, useState } from "react";
import moment from "moment";
interface VideoPlayerProps {
  onTimeUpdate: (time: number) => void;
  timeStamp: string;
  videoId: string;
  functionToPassCreatedOnToDashboard: (
    createdOn: string,
    creator: Object
  ) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onTimeUpdate,
  timeStamp,
  videoId,
  functionToPassCreatedOnToDashboard,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [videoKey, setVideoKey] = useState(null);
  const [videosrc, setVideosrc] = useState("");

  console.log("videoid from videoPlayer", videoId);

  const fetchVideoKey = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/getVideoId/${videoId}`
      );
      if (!response.ok) {
        throw new Error("Video not found");
      }
      const data = await response.json();
      console.log("key from videoPlayer", data.key);
      console.log("creaton from videoPlayer", data.createdon);
      console.log("creator from videoPlayer", data.creator);

      functionToPassCreatedOnToDashboard(
        moment(data.createdOn).format("DD MMM YYYY"),
        data.creator
      );
      // setVideoKey(data.key);
      setVideosrc(`https://d1yt4919vxgwb5.cloudfront.net/${data.key}`);
      console.log(
        `src from fetchvideoKey :https://d1yt4919vxgwb5.cloudfront.net/${data.key}`
      );
      console.log("hello");
    } catch (error) {
      console.error("Error fetching video key:", error);
      // Handle error, show a message, etc.
    }
  };
  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePause = () => {
      // Check if videoElement is not null before accessing its properties
      if (videoElement) {
        const currentTime = videoElement.currentTime;
        console.log("Current Time:", currentTime);
        onTimeUpdate(currentTime);
      }
    };

    const handleClick = () => {
      // Trigger handlePause when the video is clicked
      handlePause();
    };

    // Add event listeners for both pause and click
    if (videoElement) {
      // videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("click", handleClick);
    }

    // Cleanup: remove event listeners when component unmounts
    return () => {
      if (videoElement) {
        // videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("click", handleClick);
      }
    };
  }, [videoRef.current, videoId]);

  useEffect(() => {
    if (videoId) {
      fetchVideoKey();
      // console.log(
      //   `video src from videoPlayer:https://d1yt4919vxgwb5.cloudfront.net/${videoKey}`
      // );
    }
    const videoElement = videoRef.current;

    // Seek to the specified timestamp when it is provided
    if (videoElement && timeStamp) {
      const [minutes, seconds] = timeStamp.split(":").map(Number);
      const timestampInSeconds = minutes * 60 + seconds;

      if (!isNaN(timestampInSeconds)) {
        videoElement.currentTime = timestampInSeconds;
      }
    }
  }, [videoRef.current, timeStamp, videoId]);

  return (
    <>
      {videosrc ? (
        <video
          ref={videoRef}
          className=" h-full lg:h- w-full lg:w-[900px] lg:pl-  rounded-r-lg rounded-l-lg"
          controls
        >
          <source
            // src="https://d1yt4919vxgwb5.cloudfront.net/recorded-video_2024_01_22T16_42_23_637Z.mp4"
            src={videosrc}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </>
  );
};

export default VideoPlayer;

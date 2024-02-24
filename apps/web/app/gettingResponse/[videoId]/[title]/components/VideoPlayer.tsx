"use client";
import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  onTimeUpdate: (time: number) => void;
  timeStamp: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  onTimeUpdate,
  timeStamp,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  }, [videoRef.current]);

  useEffect(() => {
    const videoElement = videoRef.current;

    // Seek to the specified timestamp when it is provided
    if (videoElement && timeStamp) {
      const [minutes, seconds] = timeStamp.split(":").map(Number);
      const timestampInSeconds = minutes * 60 + seconds;

      if (!isNaN(timestampInSeconds)) {
        videoElement.currentTime = timestampInSeconds;
      }
    }
  }, [videoRef.current, timeStamp]);

  return (
    <video
      ref={videoRef}
      className="h-full w-[900px] lg:pl-  rounded-r-lg rounded-l-lg"
      controls
    >
      <source
        src="https://d1yt4919vxgwb5.cloudfront.net/recorded-video18.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;

"use client";
import React, { useEffect, useRef } from "react";
import RecordRTC from "recordrtc";
import { useState } from "react";

const VideoScreenRecorder = () => {
  const videoElement: any = useRef(null);
  const recorder: any = useRef(null);
  // let resultVideosrc;
  const [resultVideosrc, setResultVideosrc] = useState("hlo");

  useEffect(() => {
    const startRecordingButton: any = document.getElementById(
      "btn-start-recording"
    );
    const stopRecordingButton: any =
      document.getElementById("btn-stop-recording");

    const sendMessage: any = document.getElementById("send-message");

    if (
      !(navigator as any).getDisplayMedia &&
      !navigator.mediaDevices.getDisplayMedia
    ) {
      const error = "Your browser does NOT support the getDisplayMedia API.";
      sendMessage.innerHTML = error;
      videoElement.current.style.display = "none";
      startRecordingButton.style.display = "none";
      stopRecordingButton.style.display = "none";
      throw new Error(error);
    }

    let screenStream, cameraStream;

    const invokeGetDisplayMedia = async () => {
      const displayMediaConstraints = {
        video: true,
      };

      try {
        if (navigator.mediaDevices.getDisplayMedia) {
          screenStream = await navigator.mediaDevices.getDisplayMedia(
            displayMediaConstraints
          );
        } else {
          screenStream = await (navigator as any).getDisplayMedia(
            displayMediaConstraints
          );
        }
      } catch (error) {
        console.error(error);
        alert(
          "Unable to capture your screen. Please check console logs.\n" + error
        );
      }
    };

    const captureCamera = async () => {
      try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
      } catch (error) {
        console.error(error);
      }
    };

    const keepStreamActive = (stream) => {
      const newVideo = document.createElement("video");
      newVideo.muted = true;
      newVideo.srcObject = stream;
      newVideo.style.display = "none";
      (document.body || document.documentElement).appendChild(newVideo);
    };

    const startRecording = async () => {
      await invokeGetDisplayMedia();
      await captureCamera();

      keepStreamActive(screenStream);
      keepStreamActive(cameraStream);

      screenStream.width = window.screen.width;
      screenStream.height = window.screen.height;
      screenStream.fullcanvas = true;

      cameraStream.width = 320;
      cameraStream.height = 240;
      cameraStream.top = screenStream.height - cameraStream.height;
      cameraStream.left = screenStream.width - cameraStream.width;

      // recorder.current = new RecordRTC([screenStream, cameraStream], {
      //   type: "video",
      //   mimeType: "video/webm",
      //   previewStream: (s) => {
      //     videoElement.current.muted = true;
      //     videoElement.current.srcObject = s;
      //   },
      // });

      // recorder.current.startRecording();
    };

    const stopRecording = async () => {
      if (recorder.current) {
        recorder.current.stopRecording(async () => {
          const blob = recorder.current.getBlob();
          videoElement.current.srcObject = null;
          videoElement.current.src = URL.createObjectURL(blob);
          videoElement.current.muted = false;

          if (screenStream && screenStream.getTracks) {
            if (screenStream.getTracks) {
              screenStream.getTracks().forEach((track) => {
                track.stop();
              });
            }
          }

          if (cameraStream && cameraStream.getTracks) {
            if (cameraStream.getTracks) {
              cameraStream.getTracks().forEach((track) => {
                track.stop();
              });
            }
          }

          const videoFile = new File([blob], "recorded-video8.mp4", {
            type: "video/mp4",
          });
          console.log(videoFile);

          // try {
          //   const formData = new FormData();
          //   formData.append('file', videoFile);

          //   // const response = await axios.post(
          //   //   'http://localhost:8080/api/uploadVideo',
          //   //   formData,
          //   //   {
          //   //     headers: {
          //   //       'Content-Type': 'multipart/form-data', // Ensure the correct content type for file upload
          //   //     },
          //   //   }
          //   // );

          //   console.log(response.data);

          //   if (response.data.success) {
          //     alert('Video uploaded successfully');
          //   } else {
          //     alert('Video upload failed');
          //   }
          // } catch (error) {
          //   // console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
          //   // console.log('Server Response Data:', error.response.data);
          //   // res.status(500).json({ error: 'Error uploading file', details: error.response.data });
          //   console.error('Error uploading video:', error);

          //   // Now, handle the error and send the response
          //   const errorResponse = {
          //     error: 'Error uploading file',
          //     details: error.response ? error.response.data : 'Unknown error',
          //   };

          //   // Assuming you have access to the 'res' object here
          //   res.status(500).json(errorResponse);
          // }
          try {
            const formData = new FormData();
            formData.append("file", videoFile);

            const response = await fetch(
              "http://localhost:8080/api/uploadVideo",
              {
                method: "POST",
                body: formData,
              }
            );

            const responseData = await response.json();
            const { result, success } = responseData;
            console.log("Server Response:", responseData);
            console.log("Server Response result:", result.key);
            setResultVideosrc(
              `https://d1yt4919vxgwb5.cloudfront.net/${result.key}`
            );
            try {
            } catch (error) {}
            // let state = {
            //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
            // };

            console.log(resultVideosrc);
            if (responseData.success) {
              alert("Video uploaded successfully");
            } else {
              alert("Video upload failed");
            }
          } catch (error) {
            console.error("Error uploading video:", error);
            alert("Error uploading video");
          }
        });
      }
    };

    startRecordingButton.addEventListener("click", startRecording);
    stopRecordingButton.addEventListener("click", stopRecording);

    return () => {
      if (recorder.current) {
        recorder.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoElement}
        controls
        autoPlay
        playsInline
        style={{ width: "40%" }}
      ></video>
      <button id="btn-start-recording">Start Recording</button>
      <button id="btn-stop-recording">Stop Recording</button>
      <video
        src={resultVideosrc}
        controls
        autoPlay
        playsInline
        style={{ width: "40%" }}
      ></video>
    </div>
  );
};

export default VideoScreenRecorder;

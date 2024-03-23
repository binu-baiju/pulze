// "use client";
// import React, { useEffect, useRef } from "react";
// import RecordRTC from "recordrtc";
// import axios from "axios";
// import { useState } from "react";

// // const VideoScreenRecorder = ({ onRecordingComplete }) => {
// const VideoScreenRecorder = React.forwardRef(({ onRecordingComplete }, ref) => {
//   const videoElement = useRef(null);
//   const recorder = useRef(null);
//   // let resultVideosrc;
//   const [resultVideosrc, setResultVideosrc] = useState("hlo");
//   const [isRecording, setIsRecording] = useState(false);

//   const handleRecordingComplete = (recordedData) => {
//     // Do any processing or validation if needed
//     onRecordingComplete(recordedData);
//   };
//   // useImperativeHandle(ref, () => ({
//   //   startRecording: startRe, // Pass the reference to the function
//   // }));

//   useEffect(() => {
//     const startRecordingButton = document.getElementById("btn-start-recording");
//     const stopRecordingButton = document.getElementById("btn-stop-recording");

//     const sendMessage = document.getElementById("send-message");

//     if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
//       const error = "Your browser does NOT support the getDisplayMedia API.";
//       sendMessage.innerHTML = error;
//       videoElement.current.style.display = "none";
//       startRecordingButton.style.display = "none";
//       stopRecordingButton.style.display = "none";
//       throw new Error(error);
//     }

//     let screenStream, cameraStream;

//     const invokeGetDisplayMedia = async () => {
//       const displayMediaConstraints = {
//         video: true,
//       };

//       try {
//         if (navigator.mediaDevices.getDisplayMedia) {
//           screenStream = await navigator.mediaDevices.getDisplayMedia(
//             displayMediaConstraints
//           );
//         } else {
//           screenStream = await navigator.getDisplayMedia(
//             displayMediaConstraints
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         alert(
//           "Unable to capture your screen. Please check console logs.\n" + error
//         );
//       }
//     };

//     const captureCamera = async () => {
//       try {
//         cameraStream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: true,
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const keepStreamActive = (stream) => {
//       const newVideo = document.createElement("video");
//       newVideo.muted = true;
//       newVideo.srcObject = stream;
//       newVideo.style.display = "none";
//       (document.body || document.documentElement).appendChild(newVideo);
//     };

//     const startRecording = async () => {
//       setIsRecording(true);
//       await invokeGetDisplayMedia();
//       await captureCamera();

//       keepStreamActive(screenStream);
//       keepStreamActive(cameraStream);

//       screenStream.width = window.screen.width;
//       screenStream.height = window.screen.height;
//       screenStream.fullcanvas = true;

//       cameraStream.width = 320;
//       cameraStream.height = 240;
//       cameraStream.top = screenStream.height - cameraStream.height;
//       cameraStream.left = screenStream.width - cameraStream.width;

//       recorder.current = RecordRTC([screenStream, cameraStream], {
//         type: "video",
//         mimeType: "video/webm",
//         previewStream: (s) => {
//           videoElement.current.muted = true;
//           videoElement.current.srcObject = s;
//         },
//       });

//       recorder.current.startRecording();
//     };

//     const stopRecording = async () => {
//       setIsRecording(false);
//       if (recorder.current) {
//         recorder.current.stopRecording(async () => {
//           const blob = recorder.current.getBlob();
//           videoElement.current.srcObject = null;
//           videoElement.current.src = URL.createObjectURL(blob);
//           videoElement.current.muted = false;

//           if (screenStream && screenStream.getTracks) {
//             if (screenStream.getTracks) {
//               screenStream.getTracks().forEach((track) => {
//                 track.stop();
//               });
//             }
//           }

//           if (cameraStream && cameraStream.getTracks) {
//             if (cameraStream.getTracks) {
//               cameraStream.getTracks().forEach((track) => {
//                 track.stop();
//               });
//             }
//           }

//           const videoFile = new File([blob], "recorded-video18.mp4", {
//             type: "video/mp4",
//           });
//           console.log(videoFile);

//           // try {
//           //   const formData = new FormData();
//           //   formData.append('file', videoFile);

//           //   // const response = await axios.post(
//           //   //   'http://localhost:8080/api/uploadVideo',
//           //   //   formData,
//           //   //   {
//           //   //     headers: {
//           //   //       'Content-Type': 'multipart/form-data', // Ensure the correct content type for file upload
//           //   //     },
//           //   //   }
//           //   // );

//           //   console.log(response.data);

//           //   if (response.data.success) {
//           //     alert('Video uploaded successfully');
//           //   } else {
//           //     alert('Video upload failed');
//           //   }
//           // } catch (error) {
//           //   // console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
//           //   // console.log('Server Response Data:', error.response.data);
//           //   // res.status(500).json({ error: 'Error uploading file', details: error.response.data });
//           //   console.error('Error uploading video:', error);

//           //   // Now, handle the error and send the response
//           //   const errorResponse = {
//           //     error: 'Error uploading file',
//           //     details: error.response ? error.response.data : 'Unknown error',
//           //   };

//           //   // Assuming you have access to the 'res' object here
//           //   res.status(500).json(errorResponse);
//           // }
//           try {
//             const formData = new FormData();
//             formData.append("file", videoFile);

//             const response = await fetch(
//               "http://localhost:8080/api/uploadVideo",
//               {
//                 method: "POST",
//                 body: formData,
//               }
//             );

//             const responseData = await response.json();
//             const { result, success } = responseData;
//             console.log("Server Response:", responseData);
//             console.log("Server Response result:", result);
//             setResultVideosrc(
//               `https://d1yt4919vxgwb5.cloudfront.net/${result.key}`
//             );
//             onRecordingComplete(resultVideosrc);
//             try {
//             } catch (error) {}
//             // let state = {
//             //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
//             // };

//             console.log(resultVideosrc);
//             if (responseData.success) {
//               alert("Video uploaded successfully");
//             } else {
//               alert("Video upload failed");
//             }
//           } catch (error) {
//             console.error("Error uploading video:", error);
//             alert("Error uploading video");
//           }
//         });
//       }
//     };

//     startRecordingButton.addEventListener("click", startRecording);
//     stopRecordingButton.addEventListener("click", stopRecording);

//     return () => {
//       if (recorder.current) {
//         recorder.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="bg-yellow-500 flex flex-col justify-center w-full h-full">
//       {videoElement && (
//         <video
//           className={`bg-gray-900 ${isRecording ? "visible" : "hidden"}`}
//           ref={videoElement}
//           autoPlay
//           playsInline
//           style={{ width: "100%", height: "100%" }}
//         ></video>
//       )}

//       <button id="btn-start-recording">Start Recording</button>
//       <button id="btn-stop-recording">Stop Recording</button>
//       {/* <video
//         src={resultVideosrc}
//         controls
//         autoPlay
//         playsInline
//         style={{ width: "40%" }}
//       ></video> */}
//     </div>
//   );
// });

// export default VideoScreenRecorder;

"use client";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import RecordRTC from "recordrtc";
import axios from "axios";
import { useState } from "react";

import { useMyContext } from "../../../context/MyContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
// import { log } from "console";
// const VideoScreenRecorder = forwardRef((props, ref) => {
//   useImperativeHandle(ref, () => ({
//     startRecording: () => {
//       // startRecording();
//       console.log("called from parent");
//     },
//   }));
// });

// const VideoScreenRecorder = ({ onRecordingComplete }) => {
const VideoScreenRecorder = forwardRef((props, ref) => {
  const {
    title,
    description,
    videoId,
    requestBody,
    typeComment1,
    saveVideoAfterStopRecordingOrNot,
    onRecordingCompleteAndGettingVideoId,
    selectWorkspace,
  } = props;
  console.log(`title:${title}`);
  console.log(`description:${description}`);
  console.log(`VideoId:${videoId}`);
  console.log("Requestbody from videoScreenRecorder", requestBody);
  console.log(`typecomment1:${typeComment1}`);
  console.log("saveVideoAfterStopRecording", saveVideoAfterStopRecordingOrNot);
  console.log("selectWorkspaceID", selectWorkspace.workspace_id);
  const workspaceId = selectWorkspace.workspace_id;

  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
    createVideoComment,
  }));
  const videoElement = useRef(null);
  const recorder = useRef(null);
  // let resultVideosrc;
  const [resultVideosrc, setResultVideosrc] = useState("hlo");
  const [isRecording, setIsRecording] = useState(false);
  const [shouldVideoVisible, setVideoVisible] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const { resultVideosrccontext, setResultVideosrccontext } = useMyContext();

  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const handleRecordingComplete = (recordedData) => {
    // Do any processing or validation if needed
    onRecordingComplete(recordedData);
  };

  const keepStreamActive = (stream) => {
    const newVideo = document.createElement("video");
    newVideo.muted = true;
    newVideo.srcObject = stream;
    newVideo.style.display = "none";
    (document.body || document.documentElement).appendChild(newVideo);
  };
  const startRecording = async () => {
    setIsRecording(true);
    setVideoVisible(true);
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

    recorder.current = RecordRTC([screenStream, cameraStream], {
      type: "video",
      mimeType: "video/webm",
      previewStream: (s) => {
        videoElement.current.muted = true;
        videoElement.current.srcObject = s;
      },
    });

    recorder.current.startRecording();
  };
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
        screenStream = await navigator.getDisplayMedia(displayMediaConstraints);
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

  const stopRecording = async () => {
    setIsRecording(false);
    // videoFile = "";
    if (recorder.current) {
      recorder.current.stopRecording(async () => {
        const blob = recorder.current.getBlob();
        if (videoElement.current) {
          videoElement.current.srcObject = null;
          videoElement.current.src = URL.createObjectURL(blob);
          videoElement.current.muted = false;
        }
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
        const timestamp = new Date()
          .toISOString()
          .replace(/[^a-zA-Z0-9]/g, "_");
        const videoFileName = `recorded-video_${timestamp}.mp4`;

        const videoFile = new File([blob], videoFileName, {
          type: "video/mp4",
        });
        setVideoFile(videoFile);
        console.log("videoFile is below from stop recording");

        console.log(videoFile);

        // try {
        //   const formData = new FormData();
        //   formData.append("file", videoFile);

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
        //     alert("Video uploaded successfully");
        //   } else {
        //     alert("Video upload failed");
        //   }
        // } catch (error) {
        //   // console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
        //   // console.log('Server Response Data:', error.response.data);
        //   // res.status(500).json({ error: 'Error uploading file', details: error.response.data });
        //   console.error("Error uploading video:", error);

        //   // Now, handle the error and send the response
        //   const errorResponse = {
        //     error: "Error uploading file",
        //     details: error.response ? error.response.data : "Unknown error",
        //   };

        //   // Assuming you have access to the 'res' object here
        //   res.status(500).json(errorResponse);
        // }
        if (saveVideoAfterStopRecordingOrNot) {
          setVideoVisible(false);
          try {
            const formData = new FormData();
            formData.append("file", videoFile);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("userId", userId);
            formData.append("selectWorkspaceId", selectWorkspace.workspace_id);

            const response = await fetch(
              "http://localhost:8080/api/uploadVideo",
              // `http://localhost:8080/api/comments/createvideocomment/${videoId}`,
              {
                method: "POST",
                body: formData,
              }
            );

            const responseData = await response.json();
            const { result } = responseData;
            setResultVideosrccontext(
              `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
            );
            console.log("Server Response:", responseData);
            console.log(
              "Server Response result:",
              result.VideoUploadedtoVideoMySqlDetails
            );
            console.log(
              "Server Response result,VideoId:",
              result.VideoUploadedtoVideoMySqlDetails.video_id
            );

            setResultVideosrc(
              `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
            );

            // console.log(` src:${resultVideosrccontext}`);
            // onRecordingComplete(resultVideosrc);

            // let state = {
            //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
            // };

            console.log(resultVideosrc);
            if (responseData.success) {
              console.log(`src:${resultVideosrccontext}`);
              if (typeof onRecordingCompleteAndGettingVideoId === "function") {
                try {
                  console.log(result.VideoUploadedtoVideoMySqlDetails);
                  // result.VideoUploadedtoVideoMySqlDetails.video_id

                  onRecordingCompleteAndGettingVideoId(
                    result.VideoUploadedtoVideoMySqlDetails
                  );
                } catch (error) {
                  console.error("Error doing the function:", error);
                }
              } else {
                console.error(
                  "onRecordingCompleteAndGettingVideoId is not a function"
                );
              }

              toast("Video uploaded successfully");
            } else {
              toast("Video upload failed");
            }
          } catch (error) {
            console.error("Error uploading video:", error);
            alert("Error uploading video");
          }
        }
      });
    }
  };
  // console.log("outisde stop recording");
  // console.log(videoFile);
  const createVideoComment = async (parentCommentId = null) => {
    // console.log(requestBody);
    console.log("videoFile from create videoComment below");
    console.log(videoFile);
    const { userId, timeStamp, type } = requestBody;

    console.log(`userId:${userId}`);
    console.log(`timeStamp:${timeStamp}`);
    console.log(`type:${type}`);
    console.log(`parentId:${parentCommentId}`);
    console.log(
      `typecomment1 from inside createvideoComment function:${typeComment1}`
    );

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("userId", userId);
      formData.append("timeStamp", timeStamp);
      // formData.append("parentCommentId", parentCommentId);
      if (parentCommentId !== null) {
        formData.append("parentCommentId", parentCommentId);
      }
      formData.append("typeComment", type);

      console.log(formData);
      const response = await fetch(
        `http://localhost:8080/api/comments/createvideocomment/${videoId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        console.error(`Error uploading video:`);
      }
      const responseData = await response.json();
      console.log("Server Response:", responseData);

      const { result, success } = responseData;
      console.log("sucess", success);
      if (
        result.VideoUploadedToS3Details &&
        result.VideoUploadedToS3Details.key
      ) {
        setResultVideosrccontext(
          `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
        );
        // console.log("Server Response:", responseData);
        // console.log("Server Response result:", result);
        setResultVideosrc(
          `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
        );
      }
      // console.log(` src:${resultVideosrccontext}`);
      // onRecordingComplete(resultVideosrc);

      // let state = {
      //   resultVideosrc:`https://d1yt4919vxgwb5.cloudfront.net/${result.key}`, // Set a default value
      // };

      console.log(resultVideosrc);
      if (success) {
        console.log(`src:${resultVideosrccontext}`);
        toast("Video uploaded successfully");
      } else {
        toast("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // alert("Error uploading video from frontend");
    }
  };

  const startCamera = async () => {
    try {
      // Access the camera
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setCameraStream(cameraStream);

      // Attach the camera stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const stopCamera = () => {
    // Stop the tracks associated with the camera stream
    if (cameraStream && cameraStream.getTracks) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };
  useEffect(() => {
    const startRecordingButton = document.getElementById("btn-start-recording");
    const stopRecordingButton = document.getElementById("btn-stop-recording");

    const sendMessage = document.getElementById("send-message");

    if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
      const error = "Your browser does NOT support the getDisplayMedia API.";
      sendMessage.innerHTML = error;
      videoElement.current.style.display = "none";
      startRecordingButton.style.display = "none";
      stopRecordingButton.style.display = "none";
      throw new Error(error);
    }

    // startRecordingButton.addEventListener("click", startRecording);
    // stopRecordingButton.addEventListener("click", stopRecording);

    return () => {
      if (recorder.current) {
        recorder.current.destroy();
      }
    };
  }, []);

  return (
    <div className=" flex flex-col justify-center w-full h-full">
      {videoElement && (
        <video
          className={`bg-gray-900 ${shouldVideoVisible ? "visible" : "hidden"}`}
          // className="bg-gray-900 visible"
          ref={videoElement}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%" }}
        ></video>
      )}
      {/* <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button> */}
      <div
        className={`min-h-[100px] ${shouldVideoVisible ? "hidden" : "visible"}`}
      ></div>
      {/* <button id="btn-start-recording">Start Recording</button>
      <button id="btn-stop-recording">Stop Recording</button> */}
      {/* <video
        src={resultVideosrccontext}
        controls
        autoPlay
        playsInline
        style={{ width: "40%" }}
      ></video> */}
    </div>
  );
});
// const VideoScreen = ({ playerRef }) => {
const VideoScreen = ({
  playerRef,
  title,
  description,
  onRecordingComplete,
  videoId,
  requestBody,
  typeComment1,
  saveVideoAfterStopRecordingOrNot,
  onRecordingCompleteAndGettingVideoId,
  selectWorkspace,
}) => {
  const { resultVideosrccontext } = useMyContext();
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
  console.log(`src in parent ${resultVideosrccontext}`);
  return (
    <VideoScreenRecorder
      ref={playerRef}
      title={title}
      description={description}
      videoId={videoId}
      requestBody={requestBody}
      typeComment1={typeComment1}
      saveVideoAfterStopRecordingOrNot={saveVideoAfterStopRecordingOrNot}
      onRecordingCompleteAndGettingVideoId={
        onRecordingCompleteAndGettingVideoId
      }
      selectWorkspace={selectWorkspace}
      // onRecordingComplete={handleRecordingComplete}
    />
  );
};
export default VideoScreen;

// "use client";
// import React, { FC, memo, useState } from "react";
// import { Button } from "ui/components/button";
// // import { FaVideoSlash, FaDownload, FaCamera } from 'react-icons/fa';
// // import "video-react/dist/video-react.css";
// // @ts-ignore
// // import { Player } from "video-react";
// // @ts-ignore
// import RecordRTC, {
//   // @ts-ignore
//   RecordRTCPromisesHandler,
// } from "recordrtc";
// import { saveAs } from "file-saver";
// import { Camera, Download, Video } from "lucide-react";

// const MainRecorder: FC = () => {
//   const [recorder, setRecorder] = useState<RecordRTC | null>();
//   const [stream, setStream] = useState<MediaStream | null>();
//   const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();
//   const [type, setType] = useState<"video" | "screen">("video");

//   const startRecording = async () => {
//     const mediaDevices = navigator.mediaDevices;
//     const stream: MediaStream =
//       type === "video"
//         ? await mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           })
//         : await (mediaDevices as any).getDisplayMedia({
//             video: true,
//             audio: false,
//           });
//     const recorder = new RecordRTC(stream, {
//       type: "video",
//     });

//     await recorder.startRecording();
//     setRecorder(recorder);
//     setStream(stream);
//     setVideoUrlBlob(null);
//   };

//   const stopRecording = async () => {
//     if (recorder) {
//       await recorder.stopRecording();
//       const blob: Blob = await recorder.getBlob();
//       (stream as any).stop();
//       console.log(blob);

//       setVideoUrlBlob(blob);
//       // console.log(videoBlob);

//       setStream(null);
//       setRecorder(null);
//     }
//   };

//   const downloadVideo = () => {
//     if (videoBlob) {
//       const mp4File = new File([videoBlob], "demo.mp4", { type: "video/mp4" });
//       saveAs(mp4File, `Video-${Date.now()}.mp4`);
//       // saveAs(videoBlob, `Video-${Date.now()}.webm`);
//     }
//   };

//   const changeType = () => {
//     if (type === "screen") {
//       setType("video");
//     } else {
//       setType("screen");
//     }
//   };

//   return (
//     <div className="grid gap-5 p-5">
//       <div className="flex justify-center flex-col md:flex-row">
//         <Button
//           className="m-1 bg-blue-600 text-white"
//           size="lg"
//           aria-label="start recording"
//           onClick={changeType}
//         >
//           {type === "screen" ? "Record Screen" : "Record Video"}
//         </Button>
//         <Button
//           className="m-1 bg-blue-600 text-white"
//           size="lg"
//           aria-label="start recording"
//           onClick={startRecording}
//         >
//           <Camera />
//         </Button>
//         <Button
//           className="m-1 bg-blue-600 text-white"
//           size="lg"
//           aria-label="stop recording"
//           onClick={stopRecording}
//           disabled={!recorder}
//         >
//           <Video />
//         </Button>
//         <Button
//           className="m-1 bg-blue-600 text-white"
//           size="lg"
//           disabled={!videoBlob}
//           onClick={downloadVideo}
//           aria-label="download video"
//         >
//           <Download />
//         </Button>
//       </div>
//       <div className="flex justify-center">
//         <div
//           className={`${
//             videoBlob ? "inherit" : "bg-blue-50"
//           } h-50vh md:w-1/2 lg:w-1/4 xl:w-1/4`}
//         >
//           {videoBlob && <video controls src={URL.createObjectURL(videoBlob)} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainRecorder;

// // Add this line if not already present
// export const config = { unstable_runtimeJS: false };

// import React, { FC, memo, useState } from "react";
// import RecordRTC, {
//   // @ts-ignore
//   RecordRTCPromisesHandler,
// } from "recordrtc";
// import { saveAs } from "file-saver";

// const MainRecorder = () => {
//   const [recorder, setRecorder] = useState();
//   const [stream, setStream] = useState();
//   const [videoBlob, setVideoUrlBlob] = useState();
//   const [type, setType] = (useState < "video") | ("screen" > "video");

//   const startRecording = async () => {
//     const mediaDevices = navigator.mediaDevices;
//     const stream =
//       type === "video"
//         ? await mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           })
//         : await mediaDevices.getDisplayMedia({
//             video: true,
//             audio: false,
//           });
//     // @ts-ignore

//     const recorder = new RecordRTCPromisesHandler(stream, {
//       type: "video",
//     });
//     //   await recorder.startRecording();
//     //   setRecorder(recorder);
//     //   setStream(stream);
//     //   setVideoUrlBlob(null);
//   };
//   return <div>Hello</div>;
// };

// export default MainRecorder;

// "use client";
// // Import necessary modules and components
// import React, { FC, useEffect, useRef, useState } from "react";
// import RecordRTC from "recordrtc";
// import { saveAs } from "file-saver";

// const MainRecorder = ({ onRecordingComplete }) => {
//   const videoElement = useRef(null);
//   const recorder = useRef(null);
//   // let resultVideosrc;
//   const [resultVideosrc, setResultVideosrc] = useState("hlo");

//   const handleRecordingComplete = (recordedData) => {
//     // Do any processing or validation if needed
//     onRecordingComplete(recordedData);
//   };
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
//     let screenStream;

//     const invokeGetDisplayMedia = async () => {
//       const displayMediaConstraints = {
//         video: true,
//         audio: true,
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
//     const keepStreamActive = (stream) => {
//       const newVideo = document.createElement("video");
//       newVideo.muted = true;
//       newVideo.srcObject = stream;
//       newVideo.style.display = "none";
//       (document.body || document.documentElement).appendChild(newVideo);
//     };
//     const startRecording = async () => {
//       await invokeGetDisplayMedia();

//       keepStreamActive(screenStream);

//       screenStream.width = window.screen.width;
//       screenStream.height = window.screen.height;
//       screenStream.fullcanvas = true;
//       recorder.current = RecordRTC(screenStream, {
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
//           const videoFile = new File([blob], "recorded-video18.mp4", {
//             type: "video/mp4",
//           });
//           console.log(videoFile);

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
//     <div>
//       <video
//         ref={videoElement}
//         controls
//         autoPlay
//         playsInline
//         style={{ width: "40%" }}
//       ></video>
//       <button id="btn-start-recording">Start Recording</button>
//       <button id="btn-stop-recording">Stop Recording</button>
//       <video
//         src={resultVideosrc}
//         controls
//         autoPlay
//         playsInline
//         style={{ width: "40%" }}
//       ></video>
//     </div>
//   );
// };

// export default MainRecorder;

// Import necessary modules and components

// "use client";
// Import necessary modules and components
// Import necessary modules and components
// import React, { useEffect, useRef, useState } from "react";
// import RecordRTC from "recordrtc";

// const VideoAndAudioRecorder = () => {
//   const videoElement = useRef(null);
//   const recorderRef = useRef(null);
//   const [recording, setRecording] = useState(false);

//   const captureCamera = (callback) => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((camera) => {
//         callback(camera);
//       })
//       .catch((error) => {
//         alert("Unable to capture your camera. Please check console logs.");
//         console.error(error);
//       });
//   };

//   const stopRecordingCallback = () => {
//     videoElement.current.src = videoElement.current.srcObject = null;
//     videoElement.current.muted = false;
//     videoElement.current.volume = 1;
//     videoElement.current.src = URL.createObjectURL(
//       recorderRef.current.getBlob()
//     );

//     recorderRef.current.camera.stop();
//     recorderRef.current.destroy();
//     recorderRef.current = null;
//     setRecording(false);
//   };
//   // const stopRecordingCallback = () => {
//   //   recorderRef.current.getDataURL((dataURL) => {
//   //     videoElement.current.src = dataURL;
//   //     recorderRef.current.camera.stop();
//   //     recorderRef.current.destroy();
//   //     recorderRef.current = null;
//   //     setRecording(false);
//   //   });
//   // };

//   const startRecording = () => {
//     if (!recording) {
//       captureCamera((camera) => {
//         videoElement.current.muted = true;
//         videoElement.current.volume = 0;
//         videoElement.current.srcObject = camera;

//         const newRecorder = RecordRTC(camera, { type: "video" });
//         newRecorder.startRecording();

//         // release camera on stopRecording
//         newRecorder.camera = camera;

//         recorderRef.current = newRecorder;
//         setRecording(true);
//       });
//     }
//   };

//   const stopRecording = () => {
//     if (recording) {
//       recorderRef.current.stopRecording(stopRecordingCallback);
//     }
//   };

//   return (
//     <div>
//       <title>Video Recording | RecordRTC</title>
//       <h1>Simple Video and Audio </h1>

//       <br />

//       <button onClick={startRecording} disabled={recording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!recording}>
//         Stop Recording
//       </button>

//       <hr />
//       <video ref={videoElement} controls autoPlay playsInline></video>

//       <footer style={{ marginTop: "20px" }}>
//         <small id="send-message"></small>
//       </footer>
//       <script src="https://www.webrtc-experiment.com/common.js"></script>
//     </div>
//   );
// };

// export default VideoAndAudioRecorder;
"use client";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import RecordRTC from "recordrtc";
// import { useState } from "react";
import { useMyContext } from "../../../context/MyContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const VideoAndAudioRecorder = forwardRef((props, ref) => {
  const {
    title,
    description,
    saveVideoAfterStopRecordingOrNot,
    onRecordingCompleteAndGettingVideoId,
    typeComment1,
    requestBody,
    videoId,
    selectWorkspace,
  } = props;
  console.log(`title:${title}`);
  console.log(`description:${description}`);
  console.log(`VideoId:${videoId}`);
  console.log("Requestbody from VideoAndAudioRecorder", requestBody);
  console.log(`typecomment1:${typeComment1}`);
  console.log("saveVideoAfterStopRecording", saveVideoAfterStopRecordingOrNot);
  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
    createVideoCameraComment,
  }));
  const videoElement = useRef(null);
  const recorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shouldVideoVisible, setVideoVisible] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const { resultVideosrccontext, setResultVideosrccontext } = useMyContext();
  const [resultVideosrc, setResultVideosrc] = useState("hlo");
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const captureCamera = (callback) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((camera) => {
        callback(camera);
      })
      .catch((error) => {
        alert("Unable to capture your camera. Please check console logs.");
        console.error(error);
      });
  };

  const stopRecordingCallback = async () => {
    videoElement.current.src = videoElement.current.srcObject = null;
    videoElement.current.muted = false;
    videoElement.current.volume = 1;
    videoElement.current.src = URL.createObjectURL(
      recorderRef.current.getBlob()
    );
    const timestamp = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const videoFileName = `recorded-video_${timestamp}.mp4`;
    const videoBlob = recorderRef.current.getBlob();
    const videoFile = new File([videoBlob], videoFileName, {
      type: "video/mp4",
    });
    setVideoFile(videoFile);
    console.log("videoFile is below from stop recording");

    console.log(videoFile);
    // try {
    //   const formData = new FormData();
    //   formData.append("file", videoFile);
    //   formData.append("title", title);
    //   formData.append("description", description);

    //   const response = await fetch("http://localhost:8080/api/uploadVideo", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const responseData = await response.json();
    //   console.log("Server Response:", responseData);

    //   if (responseData.success) {
    //     alert("Video uploaded successfully");
    //   } else {
    //     alert("Video upload failed");
    //   }
    // } catch (error) {
    //   console.error("Error uploading video:", error);
    //   alert("Error uploading video");
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
        console.log("Server Response result:", result);
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
              onRecordingCompleteAndGettingVideoId(
                result.VideoUploadedtoVideoMySqlDetails.video_id
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
    recorderRef.current.camera.stop();
    recorderRef.current.destroy();
    recorderRef.current = null;

    setPaused(false);
  };

  const createVideoCameraComment = async (parentCommentId = null) => {
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

      const responseData = await response.json();
      const { result, success } = responseData;
      setResultVideosrccontext(
        `https://d1yt4919vxgwb5.cloudfront.net/${result.VideoUploadedToS3Details.key}`
      );
      console.log("Server Response:", responseData);
      console.log("Server Response result:", result);
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
        toast("Video uploaded successfully");
      } else {
        toast("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // alert("Error uploading video from frontend");
    }
  };

  const startRecording = () => {
    if (!recording) {
      setVideoVisible(true);
      captureCamera((camera) => {
        videoElement.current.muted = true;
        videoElement.current.volume = 0;
        videoElement.current.srcObject = camera;

        const newRecorder = RecordRTC(camera, { type: "video" });
        newRecorder.startRecording();

        // release camera on stopRecording
        newRecorder.camera = camera;

        recorderRef.current = newRecorder;
        setRecording(true);
      });
    }
  };

  const stopRecording = () => {
    setRecording(false);
    if (recording) {
      recorderRef.current.stopRecording(stopRecordingCallback);
    }
  };

  const pauseRecording = () => {
    if (recording && !paused) {
      recorderRef.current.pauseRecording();
      setPaused(true);
    }
  };

  const resumeRecording = () => {
    if (recording && paused) {
      recorderRef.current.resumeRecording();
      setPaused(false);
    }
  };

  return (
    <div className=" flex flex-col justify-center w-full h-full">
      {/* <title>Video Recording | RecordRTC</title>
      <h1>Simple Video and Audio </h1>

      <br />

      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={pauseRecording} disabled={!recording || paused}>
        Pause Recording
      </button>
      <button onClick={resumeRecording} disabled={!recording || !paused}>
        Resume Recording
      </button>

      <hr /> */}
      {videoElement && (
        <>
          <video
            ref={videoElement}
            className={`bg-gray-900 ${
              shouldVideoVisible ? "visible" : "hidden"
            }`}
            controls
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          ></video>
          <div
            className={`min-h-[100px] ${
              shouldVideoVisible ? "hidden" : "visible"
            }`}
          ></div>
        </>
      )}
      {/* <footer style={{ marginTop: "20px" }}>
        <small id="send-message"></small>
      </footer>
      <script src="https://www.webrtc-experiment.com/common.js"></script> */}
    </div>
  );
});
const VideoScreen = ({
  playerRef,
  onRecordingComplete,
  title,
  description,
  saveVideoAfterStopRecordingOrNot,
  onRecordingCompleteAndGettingVideoId,
  requestBody,
  typeComment1,
  videoId,
  selectWorkspace,
}) => {
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };
  return (
    <VideoAndAudioRecorder
      ref={playerRef}
      title={title}
      description={description}
      saveVideoAfterStopRecordingOrNot={saveVideoAfterStopRecordingOrNot}
      onRecordingCompleteAndGettingVideoId={
        onRecordingCompleteAndGettingVideoId
      }
      requestBody={requestBody}
      typeComment1={typeComment1}
      videoId={videoId}
      selectWorkspace={selectWorkspace}
    />
  );
};
export default VideoScreen;

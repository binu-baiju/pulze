// import React, { useEffect, useRef,useState } from "react";
// import RecordRTC from "recordrtc";
// import {  } from "recordrtc";

// import { useMutation, gql } from "@apollo/client";


//Upload!
// const UploadFileDocument = gql`
//   mutation uploadVideo($file: Upload!) {
//     uploadVideo(file: $file) {
//       Location
//     }
//   }
// `;
// const SendMessageDocument = gql`
//   mutation sendMessage1($message: String!) {
//     sendMessage1(message: $message)
//   }
// `;
// const UPLOAD_TEXT_FILE = gql`
//   mutation uploadTextFile($file: Upload!) {
//     uploadTextFile(file: $file)
//   }
// `;

// const UploadFileDocument = gql`
//   mutation fileUpload($file: Upload!) {
//     fileUpload(file: $file) {
//       Location
//     }
//   }
// `;

// const VideoScreenRecorder = () => {
//   const videoElement = useRef(null);
//   const recorder = useRef(null);
//   const videoBlob = useRef(typeof Blob);
// //   const [uploadVideo,result] = useMutation(UploadFileDocument);
// //   const [sendMessage1, { error: sendMessageError }] = useMutation(
// //     SendMessageDocument
// //   );


// //   const [uploadTextFile] = useMutation(UPLOAD_TEXT_FILE);

//   const { data, error } = result;
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

//     const handleTextFileUpload = async () => {
//       const sampleText = "This is a sample text file for testing purposes.";
//     const blob = new Blob([sampleText], { type: "text/plain" });
//     const textFile = new File([blob], "sample-text-file.txt", { type: "text/plain" });

//     try {
//       const response = await uploadTextFile({
//         variables: {
//           file: textFile,
//         },
//       });

//       if (response.data.uploadTextFile) {
//         alert("Text file uploaded successfully");
//       } else {
//         alert("Text file upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading text file:", error);
//     }
//     };

//     const stopRecording = () => {
//       if (recorder.current) {
//       recorder.current.stopRecording(async () => {
//         const blob = recorder.current.getBlob();
//         console.log(recorder.current)
//         // videoBlob.current = recorder.current.getBlob();

//         videoElement.current.srcObject = null;
//         videoElement.current.src = URL.createObjectURL(blob);
//         // videoElement.current.src = URL.createObjectURL(videoBlob.current);

//         videoElement.current.muted = false;

      
//         if (screenStream && screenStream.getTracks) {
//           if (screenStream.getTracks) {
//             screenStream.getTracks().forEach((track) => {
//               track.stop();
//             });
//           }
//         }
//         else{
//           console.log("error screen stream");
//         }
  
//         if (cameraStream && cameraStream.getTracks) {
//           if (cameraStream.getTracks) {
//             cameraStream.getTracks().forEach((track) => {
//               track.stop();
//             });
//           }
//         }
//         function blobToFile(theBlob, fileName){
//           //A Blob() is almost a File() - it's just missing the two properties below which we will add
//           theBlob.lastModifiedDate = new Date();
//           theBlob.name = fileName;
//           return theBlob;
//         }
        
//           //     const sampleText = "This is a sample text file for testing purposes.";

//           // // Create a Blob from the sample text
//           // const blobb = new Blob([sampleText], { type: "text/plain" });


//           // recorder.current.destroy();

//         const videoFile = new File([blob], "recorded-video3.mp4",{ type: 'video/mp4' });
//         // const videoFile = blobToFile(blob,"recorded-video.webm")
//         console.log(videoFile)

//         // handleTextFileUpload(); please comment this
//       //   const sampleText = "This is a sample text file for testing purposes.";
//       // const blobs = new Blob([sampleText], { type: "text/plain" });
//       // const textFile = new File([blobs], "sample-text-file.txt", { type: "text/plain" });
//       //   const formData = new FormData();
//       // formData.append("file", textFile);

//       // try {
//       //   const response = await uploadTextFile({
//       //     variables: {
//       //       file: textFile, // Send the file in the variables
//       //     },
//       //   });

//       //   if (response.data.uploadTextFile) {
//       //     alert("Text file uploaded successfully");
//       //   } else {
//       //     alert("Text file upload failed");
//       //   }
//       // } catch (error) {
//       //   console.error("Error uploading text file:", error);
//       // }
       
// // to here!!!!
//         try {
//           console.log("HELLO BINU HAIIIIIII");

//           const formData = new FormData();
//           formData.append("file", videoFile);

//           const response = await uploadVideo({
//             variables: {
//               // file: new File([blob], "recorded-video.webm"),
//               file: videoFile,
//               // file: formData
//             }
//             // ,
//             // context: {
//             //   headers: {
//             //     "Content-Type": "multipart/form-data",
//             //   },
//             // },
              
//           });
//             // console.log("Response:::::"+response)
//           if (response.data.fileUpload) {
//             alert("Video uploaded successfully",response.data.fileUpload.Location);
//           } else {
//             alert("Video upload failed");
//           }
//         } catch (error) {
//           console.error("Error uploading video:", error);
//         }


//         // const message = "Hello from the frontenddddd!";
//         // try {
//         //   const response = await sendMessage1({
//         //     variables: {
//         //       message: message,
//         //     },
//         //   });
    
//         //   if (response.data.sendMessage1) {
//         //     alert("Message sent successfully");
//         //   } else {
//         //     alert("Message sending failed");
//         //   }
//         // } catch (error) {
//         //   console.error("Error sending message:", error);
//         // }
//       });
//     }
//     };

//     startRecordingButton.addEventListener("click", startRecording);
//     stopRecordingButton.addEventListener("click", stopRecording);

//     return () => {
//       if (recorder.current) {
//         recorder.current.destroy();
//       }
//     };
//   }, [uploadVideo]);

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
//       {/* <button onClick={()=>{
//          uploadVideo({
//           variables: {
//             file: "hello upload BInu baiju",
//           },
//         });
//       }}>response</button> */}
//       {error && (
//         <pre>
//           <code>{error.message}</code>
//         </pre>
//       )}
//     </div>
//   );
// };

// export default VideoScreenRecorder;

// "use client"
// import React, { useEffect, useRef } from "react";
// import RecordRTC from "recordrtc";
// import { useMutation, gql } from "@apollo/client";
// // onst handleRecording = async () => { const RecordRTC = (await import("recordrtc")).default;}

// const UploadFileDocument = gql`
//   mutation fileUpload($file: Upload!) {
//     fileUpload(file: $file) {
//       Location
//     }
//   }
// `;

// const VideoScreenRecorder = () => {
//   const videoElement = useRef(null);
//   const recorder = useRef(null);
//   const videoBlob = useRef(typeof Blob);
//   const [uploadVideo,result] = useMutation(UploadFileDocument);
//   const { data, error } = result;

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

//     const stopRecording = () => {
//       recorder.current.stopRecording(() => {
//         const blob = recorder.current.getBlob();
//         videoElement.current.srcObject = null;
//         videoElement.current.src = URL.createObjectURL(blob);
//         videoElement.current.muted = false;

//         [screenStream, cameraStream].forEach((stream) => {
//           stream.getTracks().forEach((track) => {
//             track.stop();
//           });
//         });
//       });
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
//     </div>
//   );
// };

// export default VideoScreenRecorder;
"use client"
import React, { useEffect, useRef } from "react";
import RecordRTC from "recordrtc";
import { useMutation, gql } from "@apollo/client";

//Upload!
// const UploadFileDocument = gql`
//   mutation uploadVideo($file: Upload!) {
//     uploadVideo(file: $file) {
//       Location
//     }
//   }
// `;

const UploadFileDocument = gql`
  mutation fileUpload($file: Upload!) {
    fileUpload(file: $file) {
      Location
    }
  }
`;

const VideoScreenRecorder = () => {
  const videoElement = useRef(null);
  const recorder = useRef(null);
  const videoBlob = useRef(typeof Blob);
  const [uploadVideo,result] = useMutation(UploadFileDocument);
  const { data, error } = result;
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
          screenStream = await navigator.getDisplayMedia(
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

    const stopRecording = () => {
      if (recorder.current) {
      recorder.current.stopRecording(async () => {
        const blob = recorder.current.getBlob();
        console.log(recorder.current)
        // videoBlob.current = recorder.current.getBlob();

        videoElement.current.srcObject = null;
        videoElement.current.src = URL.createObjectURL(blob);
        // videoElement.current.src = URL.createObjectURL(videoBlob.current);

        videoElement.current.muted = false;

      
        if (screenStream && screenStream.getTracks) {
          if (screenStream.getTracks) {
            screenStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
        }
        else{
          console.log("error screen stream");
        }
  
        if (cameraStream && cameraStream.getTracks) {
          if (cameraStream.getTracks) {
            cameraStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
        }
        function blobToFile(theBlob, fileName){
          //A Blob() is almost a File() - it's just missing the two properties below which we will add
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        
          //     const sampleText = "This is a sample text file for testing purposes.";

          // // Create a Blob from the sample text
          // const blobb = new Blob([sampleText], { type: "text/plain" });


          // recorder.current.destroy();

        const videoFile = new File([blob], "recorded-video3.mp4",{ type: 'video/mp4' });
        // const videoFile = blobToFile(blob,"recorded-video.webm")
        console.log(videoFile)
        try {
        
          const response = await uploadVideo({
            variables: {
              // file: new File([blob], "recorded-video.webm"),
              file: videoFile,

            },
            
            
          });
console.log(response);
          if (response.data.fileUpload) {
            alert("Video uploaded successfully",response.data.fileUpload.Location);
          } else {
            alert("Video upload failed");
          }
        } catch (error) {
          console.error("Error uploading video:", error);
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
  }, [uploadVideo]);

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
      {/* <button onClick={()=>{
         uploadVideo({
          variables: {
            file: "hello upload BInu baiju",
          },
        });
      }}>response</button> */}
      {error && (
        <pre>
          <code>{error.message}</code>
        </pre>
      )}
    </div>
  );
};

export default VideoScreenRecorder;
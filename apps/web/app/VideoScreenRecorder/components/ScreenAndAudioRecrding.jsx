import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import RecordRTC from "recordrtc";

const ScreenAndAudioRecorder = forwardRef((props, ref) => {
  const { title, description } = props;
  console.log(`title:${title}`);
  console.log(`description:${description}`);
  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
  }));
  const videoElement = useRef(null);
  const recorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const captureScreenAndAudio = async (callback) => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const combinedStream = new MediaStream();
      audioStream
        .getAudioTracks()
        .forEach((track) => combinedStream.addTrack(track));
      screenStream
        .getVideoTracks()
        .forEach((track) => combinedStream.addTrack(track));

      callback(combinedStream);
    } catch (error) {
      alert(
        "Unable to capture your screen and audio. Please check console logs."
      );
      console.error(error);
    }
  };

  //   const stopRecordingCallback = () => {
  //     videoElement.current.srcObject = null;

  //     recorderRef.current.destroy();
  //     recorderRef.current = null;
  //     setRecording(false);
  //   };
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

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("title", title);
      formData.append("description", description);

      const response = await fetch("http://localhost:8080/api/uploadVideo", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (responseData.success) {
        alert("Video uploaded successfully");
      } else {
        alert("Video upload failed");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video");
    }

    // recorderRef.current.screen.stop();
    recorderRef.current.destroy();
    recorderRef.current = null;
    setRecording(false);
  };

  const startRecording = () => {
    if (!recording) {
      captureScreenAndAudio((combinedStream) => {
        videoElement.current.srcObject = combinedStream;

        const newRecorder = RecordRTC(combinedStream, { type: "video" });
        newRecorder.startRecording();

        recorderRef.current = newRecorder;
        setRecording(true);
      });
    }
  };

  const stopRecording = () => {
    if (recording) {
      recorderRef.current.stopRecording(stopRecordingCallback);
    }
  };

  return (
    <div>
      <title>Screen and Audio Recording | RecordRTC</title>
      <h1>Simple Screen and Audio Recording using RecordRTC</h1>

      <br />

      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>

      <hr />
      <video ref={videoElement} controls autoPlay playsInline></video>

      <footer style={{ marginTop: "20px" }}>
        <small id="send-message"></small>
      </footer>
      <script src="https://www.webrtc-experiment.com/common.js"></script>
    </div>
  );
});
const VideoScreen = ({ playerRef, title, description }) => {
  return (
    <ScreenAndAudioRecorder
      ref={playerRef}
      title={title}
      description={description}
    />
  );
};
export default VideoScreen;

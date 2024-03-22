"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";
import NotificationTab from "../../components/notificationTab";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
// import Modal from "../../../../modals/ForgetPasswordModal";
interface ReceivedVideo {
  id: string;
  userId: string;
  sendVideo: {
    video: {
      video_id: string;
      title: string; // Add other properties as needed
    };
  };
  FYI: boolean;
  email: string;
  // Add other properties as needed
}
interface UserVideo {
  video_id: string;

  // Add other properties as needed
}

interface ReceivedVideosListProps {
  receivedVideos: Record<string, ReceivedVideo>; // Assuming your IDs are strings
  userVideos: Record<string, UserVideo>; // Assuming your IDs are strings
}

const socket = io("http://localhost:8080");

const ActivityPage = ({
  userVideos,
  receivedVideos: initialReceivedVideos,
  handleDeleteVideo,
}) => {
  const { data: session, status } = useSession();
  console.log("uservideos in pulze component", userVideos);
  console.log("recievedVideos in pulze component", initialReceivedVideos);

  // const [receivedVideos, setReceivedVideos] = useState(initialReceivedVideos);
  const [currentTime, setCurrentTime] = useState(new Date());
  let filteredUserVideos;
  if (userVideos) {
    filteredUserVideos = userVideos.filter((video) => {
      const responseTimeFromVideo = video.sendVideos?.[0]?.responseTime;

      if (responseTimeFromVideo) {
        const responseTime = new Date(
          responseTimeFromVideo.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          })
        );
        return currentTime < responseTime;
      }
    });
  }

  console.log("currentTime", currentTime);

  const recievedVideos = initialReceivedVideos.map((video) => {
    const responseTime = new Date(video.sendVideo.responseTime);
    console.log("recieved responseTime unfiltered", responseTime);
    // console.log("recieved responseTime unfiltered currentTime", currentTime);
  });

  const filteredReceivedVideos = initialReceivedVideos.filter(
    (recievedvideo) => {
      const responseTimeFromVideo = recievedvideo.sendVideo.responseTime;
      const responseTime = new Date(
        responseTimeFromVideo.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        })
      );
      console.log("recieved responseTime filtered", responseTime);

      return currentTime < responseTime;
    }
  );
  console.log("filteredRecievedVideo", filteredReceivedVideos);

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toISOString(); // Format the current time as ISO string
    console.log("formatted time Activity", formattedTime);

    setCurrentTime(new Date(formattedTime));
    // socket.on("receiveVideo", (video) => {
    //   alert(`received video:${video}`);
    //   toast.success("recieved a new video", video);
    //   setReceivedVideos((prevReceivedVideos) => [...prevReceivedVideos, video]);
    // });

    // return () => {
    //   socket.disconnect();
    // };
    // }, [socket, receivedVideos, userVideos]);
  }, [socket, initialReceivedVideos, userVideos]);

  return (
    <div className="app-wrapper  h-screen  sm:w-full w-full overflow-x-hidden  ">
      <Header headerTitle="My Pulzes" />
      {/* <Modal /> */}
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          {(filteredUserVideos || filteredReceivedVideos) &&
          (filteredUserVideos.length > 0 ||
            filteredReceivedVideos.length > 0) ? (
            <>
              <div>Send Pulzes</div>
              {/* {userVideos.map((video) => { */}
              {filteredUserVideos.map((video) => {
                const recipients = video?.sendVideos?.[0]?.recipients;

                if (recipients && recipients.length > 0) {
                  const responseTime = new Date(
                    video.sendVideos?.[0]?.responseTime
                  );
                  if (currentTime < responseTime) {
                    return (
                      <NotificationTab
                        key={video.video_id}
                        video={video}
                        session={session}
                        isRecievedVideo={false}
                        fullVideoObject={undefined}
                        handleDeleteVideo={handleDeleteVideo}
                      />
                    );
                  }
                }
              })}

              <div>recieved</div>

              {/* {receivedVideos.map((recievedvideo) => { */}
              {filteredReceivedVideos.map((recievedvideo) => {
                const responseTime = new Date(
                  recievedvideo.sendVideo.responseTime
                );
                if (currentTime < responseTime) {
                  return (
                    <>
                      {/* <div>{recievedvideo.sendVideo.video.video_id}</div> */}
                      <NotificationTab
                        key={recievedvideo.sendVideo.video.video_id}
                        video={recievedvideo.sendVideo.video}
                        fullVideoObject={recievedvideo}
                        session={session}
                        isRecievedVideo={true}
                        handleDeleteVideo={handleDeleteVideo}
                      />
                    </>
                  );
                }
              })}
            </>
          ) : (
            <CaughtUp />
          )}
          {/* {userVideos} */}

          {/* <NotificationTab /> */}
        </div>
      </div>
      Closed
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          {/* {receivedVideos.map((recievedvideo) => { */}

          {initialReceivedVideos.map((recievedvideo) => {
            const responseTime = new Date(recievedvideo.sendVideo.responseTime);
            if (currentTime > responseTime) {
              return (
                <>
                  {/* <div>{recievedvideo.sendVideo.video.video_id}</div> */}
                  <NotificationTab
                    key={recievedvideo.sendVideo.video.video_id}
                    video={recievedvideo.sendVideo.video}
                    session={session}
                    isRecievedVideo={true}
                    fullVideoObject={recievedvideo}
                    handleDeleteVideo={handleDeleteVideo}
                  />
                </>
              );
            }
          })}
          {userVideos.map((video) => {
            const recipients = video?.sendVideos?.[0]?.recipients;

            if (recipients && recipients.length > 0) {
              const responseTime = new Date(
                video.sendVideos?.[0]?.responseTime
              );
              if (currentTime > responseTime) {
                return (
                  <>
                    {/* <div>{video.video_id}</div> */}
                    <NotificationTab
                      key={video.video_id}
                      video={video}
                      session={session}
                      isRecievedVideo={false}
                      fullVideoObject={undefined}
                      handleDeleteVideo={handleDeleteVideo}
                    />
                  </>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

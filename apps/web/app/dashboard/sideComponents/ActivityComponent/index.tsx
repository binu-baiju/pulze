"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";

import NotificationTab from "../../components/notificationTab";
import { useSession } from "next-auth/react";

const ActivityPage = ({ userVideos, workspace, handleDeleteVideo }) => {
  const { data: session, status } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());
  let filteredUserVideos;
  const user_id = session?.user.id;
  // if (userVideos) {
  //   //   filteredUserVideos = userVideos.userVideos.filter((video) => {
  //   //     const responseTime = new Date(video.sendVideos?.[0]?.responseTime);
  //   //     return currentTime < responseTime;
  //   //   });
  //   // }
  //   filteredUserVideos = userVideos.userVideos;
  // }
  if (userVideos) {
    filteredUserVideos = userVideos.userVideos.filter((video) => {
      const responseTime = video.sendVideos?.[0]?.responseTime;
      if (!responseTime) {
        return true; // If responseTime is not there, add the video to filteredVideos
      }
      const responseDateTime = new Date(
        responseTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      return currentTime < responseDateTime;
    });
  }
  console.log("filteruservideosMypulze", filteredUserVideos);

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
  }, [userVideos]);
  return (
    <div className="app-wrapper  h-screen  sm:w-full w-full overflow-x-hidden  ">
      <Header headerTitle="MyPulze" />
      {/* <CaughtUp /> */}
      {/* {userVideos && userVideos.userVideos.length > 0 ? ( */}
      {filteredUserVideos && filteredUserVideos.length > 0 ? (
        filteredUserVideos.map((video) => (
          <NotificationTab
            key={video.video_id}
            video={video}
            session={session}
            isRecievedVideo={false}
            fullVideoObject={undefined}
            handleDeleteVideo={handleDeleteVideo}
            disableDelete={workspace.workspace_creator_id != user_id}
          />
        ))
      ) : (
        <CaughtUp />
      )}
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Done for now</div>
          {userVideos.userVideos.map((video) => {
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
                      disableDelete={workspace.workspace_creator_id != user_id}
                    />
                  </>
                );
              }
            }
          })}
          {/* <NotificationTab
            session={undefined}
            isRecievedVideo={false}
            fullVideoObject={undefined}
            handleDeleteVideo={function (
              videoId: string,
              isRecievedVideo: Boolean
            ): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

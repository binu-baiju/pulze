"use client";
import React from "react";
import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";

import NotificationTab from "../../components/notificationTab";
import { useSession } from "next-auth/react";
const ActivityPage = (userVideos) => {
  console.log("uservideos in mypulze component", userVideos);
  const { data: session, status } = useSession();
  return (
    <div className="app-wrapper  h-screen  sm:w-full w-full overflow-x-hidden  ">
      <Header headerTitle="MyPulze" />
      {/* <CaughtUp /> */}
      {userVideos && userVideos.userVideos.length > 0 ? (
        userVideos.userVideos.map((video) => (
          <NotificationTab
            key={video.video_id}
            video={video}
            session={session}
            isRecievedVideo={false}
            fullVideoObject={undefined}
          />
        ))
      ) : (
        <CaughtUp />
      )}
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Done for now</div>
          <NotificationTab
            session={undefined}
            isRecievedVideo={false}
            fullVideoObject={undefined}
          />
          <NotificationTab
            session={undefined}
            isRecievedVideo={false}
            fullVideoObject={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

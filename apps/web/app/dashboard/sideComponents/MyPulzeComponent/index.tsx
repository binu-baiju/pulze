import React from "react";
import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";
import NotificationTab from "../../components/notificationTab";
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
const ActivityPage = ({ userVideos, receivedVideos }) => {
  console.log("uservideos in pulze component", userVideos);
  console.log("recievedVideos in pulze component", receivedVideos);

  return (
    <div className="app-wrapper  h-screen  sm:w-full w-full overflow-x-hidden  ">
      <Header headerTitle="My Pulzes" />
      {/* <Modal /> */}
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Open</div>
          {userVideos.map((video) => {
            return <NotificationTab key={video.video_id} video={video} />;
          })}

          <div>recieved</div>

          {receivedVideos.map((recievedvideo) => {
            return (
              <>
                <div>{recievedvideo.sendVideo.video.video_id}</div>
                <NotificationTab
                  key={recievedvideo.sendVideo.video.video_id}
                  video={recievedvideo.sendVideo.video}
                />
              </>
            );
          })}
          {/* {userVideos} */}

          {/* <NotificationTab /> */}
        </div>
      </div>
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Closed</div>
          {/* {/* <NotificationTab key={undefined} video={undefined} /> */}
          <NotificationTab key={undefined} video={undefined} />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;

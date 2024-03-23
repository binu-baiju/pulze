// "use client";
import React from "react";
import { Input } from "ui/components";
import { AvatarDemo } from "./avatar";
import SuccessIcon from "../../../icons/SuccessIcon";
import LinkIcon from "../../../icons/LinkIcon";
import DustbinIcon from "../../../icons/DustbinIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown";
import { formattedDate } from "../../utils/formattedDate";
import { formatToDays } from "../utils/formateDateToSmallDay";

import { ChevronDown, Link, Send, UserPlus } from "lucide-react";
import { Button } from "ui";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { BorderLessInput } from "ui/components/borderlessinput";
import AutoComplete from "./Autocomplete";
import { ReadyToShareDialog } from "./ReadyToShareDialog";

// interface NotificationTabProps {
//   key: any;
//   video?: {
//     video_id: string;
//     title: string | null;
//     description: string | null;
//     ETag: string;
//     Location: string;
//     // Add other properties as needed
//     creator?: {
//       name: String;
//     };
//     comments?: {
//       user?: {
//         image?: String;
//       };
//     };
//   };

//   // Add other props as needed
// }
type Key = string | null | undefined;
interface Comment {
  [x: string]: any;
  user?: User;
  type: String;
  content: String;
  updatedAt: String;
}
interface User {
  name?: String;
  image?: string;
  id: String;
}
interface recipients {
  user?: User;
  FYI: boolean;
  status: String;
}
interface sendVideo {
  video: Video;
  sender?: User;
}
interface sendVideos {
  recipients?: recipients[];
}
interface Video {
  video_id?: String;
  comments?: Comment[];
  title?: String;
  creator: User;
  createdOn: String;
  sendVideos: sendVideos[];
  sendVideo: sendVideo;
  Key: String;
  status: String;
  FYI: String;
}
interface fullVideObject extends Video {
  id: String;
}

interface NotificationTabProps {
  video?: Video;
  key?: string;
  session: any;
  isRecievedVideo: Boolean;
  fullVideoObject: fullVideObject | undefined;
  handleDeleteVideo: (videoId: string, isRecievedVideo: Boolean) => void;
  disableDelete: boolean;
}
const NotificationTab: React.FC<NotificationTabProps> = ({
  key,
  video,
  fullVideoObject,
  session,
  isRecievedVideo,
  handleDeleteVideo,
  disableDelete = false,
}) => {
  console.log("video in notification Tab", video);
  console.log("key in notification Tab", key);

  // const { data: session, status } = useSession();

  const title = video?.title || "Untitled Pulze";
  const truncatedTitle =
    title.length > 15 ? title.substring(0, 15) + "..." : title;
  const creatorName = video?.creator?.name;
  const creatorImage = video?.creator?.image;
  const recipients = video?.sendVideos?.[0]?.recipients;
  const recipients2 = video?.sendVideo;
  console.log("recipients", recipients);
  console.log("recipients2", recipients2);

  const imageUrl = video?.comments?.[0]?.user?.image;
  console.log("imageurl in parent:", imageUrl);
  const fyiRecipients = recipients?.filter(
    (recipient) => recipient.FYI === true
  );
  const nonFyiRecipients = recipients?.filter(
    (recipient) => recipient.FYI === false
  );
  console.log("nonFyiRecipients", nonFyiRecipients);

  const lastNonFyiRecipient = nonFyiRecipients?.[nonFyiRecipients.length - 1];
  const createdOn = video?.createdOn;
  console.log("createdOn", createdOn);
  let commentSaying;
  if (session) {
    const userId = session?.user.id;
    console.log("session", session);
    if (userId === video?.comments?.[0]?.user?.id) {
      commentSaying = "you said";
    } else {
      commentSaying = `${video?.comments?.[0]?.user?.name} said`;
    }
  }
  let latestComment;
  if (video?.comments?.[0]?.type === "video") {
    latestComment = "video Comment";
  } else if (video?.comments?.[0]?.type === "text") {
    latestComment = video?.comments?.[0]?.content;
  }
  let VideoSrc;
  if (video?.Key) {
    VideoSrc = `https://d1yt4919vxgwb5.cloudfront.net/${video?.Key}`;
  }
  let recievedVideoRecipientName;
  let recievedVideoRecipientImage;
  let recievedVideoRecipientStatus;
  let recievedVideoFYICount = 0;
  let recievedVideoNonFYICount = 0;
  console.log("allvideo", video);

  if (isRecievedVideo && session) {
    recievedVideoRecipientName = session.user.name;
    recievedVideoRecipientImage = session.user.image;
    recievedVideoRecipientStatus = video?.status;
    console.log("video FYI recieved", video);

    if (fullVideoObject?.FYI) {
      recievedVideoFYICount = 1;
    } else {
      recievedVideoNonFYICount = 1;
    }
  }
  // const handleChildClick = (e) => {
  //   // Prevent event propagation
  //   e.stopPropagation();

  //   // Open dialog or perform other actions
  //   console.log("Dialog opened!");
  // };

  const router = useRouter();
  const videoId = video?.video_id || "";
  console.log("videoId pass video", videoId);

  return (
    <div
      className="flex flex-row rounded-lg shadow-xl justify-between mt-3 p-1 items-center content-center select-none cursor-pointer max-w-full"
      key={videoId as React.Key}
      onClick={() =>
        router.push(`/gettingResponse/${video?.video_id}/${title}`)
      }
    >
      <div className="flex flex-row">
        <div className="hidden md:block videolink w-14 h-14 m-0.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-solid"></div>
        <div className="ml-2 overflow-hidden">
          <h3 className="font-medium font-poppins m-1 text-base text-[#474545] capitalize overflow-hidden truncate">
            {truncatedTitle}
          </h3>
          <div className="flex inline flex-row">
            <AvatarDemo
              imageUrl={
                isRecievedVideo
                  ? fullVideoObject?.sendVideo?.sender?.image ||
                    "/icons8-user-50.png"
                  : creatorImage || "/icons8-user-50.png"
              }
            />
            <p className="font-semibold font-poppins text-[9px] pl-1.5 pt-1 text-[#474545]">
              by{" "}
              {isRecievedVideo
                ? fullVideoObject?.sendVideo?.sender?.name
                : creatorName}
              {/* by {creatorName} */}
            </p>
            <p className="font-normal font-poppins mt-1 pl-2 text-[9px] text-[#474545] tracking-wider">
              {/* •Created 1 day before */}
              •Created on {createdOn && formattedDate(createdOn)}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-start items-start  w-24">
        {recipients || isRecievedVideo ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="   rounded-md h-9 flex justify-center items-center hover:bg-gray-200 outline-none ">
              <AvatarDemo imageUrl={undefined} />
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[236px]">
              <DropdownMenuLabel className="font-medium text-[16px] ">
                Assigned-
                {isRecievedVideo
                  ? recievedVideoNonFYICount
                  : nonFyiRecipients?.length}
              </DropdownMenuLabel>
              {isRecievedVideo
                ? recievedVideoNonFYICount > 0 && (
                    <DropdownMenuItem>
                      <div className="flex justify-start">
                        <AvatarDemo
                          imageUrl={
                            session?.user?.image
                              ? session?.user?.image
                              : "/icons8-user-50.png"
                          }
                        />
                        <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0">
                          <span
                            className="font-semibold"
                            style={{ lineHeight: "10px" }}
                          >
                            {session?.user?.name}
                          </span>
                          <span
                            className="inline font-light"
                            style={{ lineHeight: "14px" }}
                          >
                            {fullVideoObject?.status
                              ? fullVideoObject?.status
                              : "hasn't opened"}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  )
                : nonFyiRecipients?.map((recipient) => (
                    <DropdownMenuItem>
                      {/* {nonFyiRecipients.length} */}
                      <div className="flex justify-start  ">
                        <AvatarDemo
                          imageUrl={
                            recipient?.user?.image
                              ? recipient?.user?.image
                              : "/icons8-user-50.png"
                          }
                        />
                        <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0  ">
                          <span
                            className="font-medium"
                            style={{ lineHeight: "10px" }}
                          >
                            {recipient?.user?.name}
                          </span>
                          <span
                            className="inline font-light "
                            style={{ lineHeight: "14px" }}
                          >
                            {recipient?.status
                              ? recipient?.status
                              : "hasn't opened"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="flex justify-start  ">
                    <AvatarDemo imageUrl={undefined} />
                    <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0  ">
                      <span className="font-medium" style={{ lineHeight: "10px" }}>
                        person-1
                      </span>
                      <span
                        className="inline font-light "
                        style={{ lineHeight: "14px" }}
                      >
                        Hasn't responded
                      </span>
                    </div>
                  </div> */}
                    </DropdownMenuItem>
                  ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="font-medium text-[16px] ">
                FYI-
                {isRecievedVideo
                  ? recievedVideoFYICount
                  : fyiRecipients?.length}
              </DropdownMenuLabel>
              {isRecievedVideo
                ? recievedVideoFYICount > 0 && (
                    <DropdownMenuItem>
                      <div className="flex justify-start">
                        <AvatarDemo imageUrl={session?.user?.image} />
                        <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0">
                          <span
                            className="font-semibold"
                            style={{ lineHeight: "10px" }}
                          >
                            {session?.user?.name}
                          </span>
                          <span
                            className="inline font-light"
                            style={{ lineHeight: "14px" }}
                          >
                            {fullVideoObject?.status
                              ? fullVideoObject?.status
                              : "hasn't opened"}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  )
                : fyiRecipients?.map((recipient) => (
                    <DropdownMenuItem>
                      <div className="flex justify-start">
                        <AvatarDemo imageUrl={recipient?.user?.image} />
                        <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0">
                          <span
                            className="font-semibold"
                            style={{ lineHeight: "10px" }}
                          >
                            {recipient?.user?.name}
                          </span>
                          <span
                            className="inline font-light"
                            style={{ lineHeight: "14px" }}
                          >
                            {recipient?.status
                              ? recipient?.status
                              : "hasn't opened"}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // <Dialog>
          //   <DialogTrigger>
          <>
            {/* <Dialog>
               <DialogTrigger> */}

            <ReadyToShareDialog videosrc={VideoSrc} />
          </>
          //   </DialogTrigger>
          // </Dialog>
        )}
      </div>
      {video?.comments && video.comments?.length > 0 ? (
        <div className="flex flex-row">
          <AvatarDemo imageUrl={imageUrl} />
          <div className="font-poppins text-[8px] text-[#474545] ml-2 capitalize">
            <p className="font-semibold">{commentSaying}</p>
            <div className="flex inline font-light">
              <p>{formatToDays(video?.comments?.[0]?.updatedAt)}</p>
              {/* <p className="ml-2">•hello</p> */}
              <p className="ml-2">•{latestComment}</p>
            </div>
          </div>
        </div>
      ) : null}
      {isRecievedVideo ? (
        <div className="hidden md:flex flex-row items-center content-center">
          <SuccessIcon />
          <p className="text-[#42D55A] text-xs ml-2 tracking-wide">
            you{" "}
            {fullVideoObject?.status ? fullVideoObject.status : "didn't opened"}
          </p>
        </div>
      ) : null}

      <div className="hidden md:flex flex-row mr-10">
        {/* <div className="mx-2 cursor-pointer">
          <LinkIcon />
        </div> */}
        <div
          className="mx-2 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {videoId && !disableDelete && (
            <DustbinIcon
              onClick={() =>
                handleDeleteVideo(videoId.toString(), isRecievedVideo)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;

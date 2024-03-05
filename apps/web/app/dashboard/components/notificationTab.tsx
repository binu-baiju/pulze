import React from "react";
// import { Input, Button } from "ui/components";
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
import { ChevronDown, UserPlus } from "lucide-react";
import { Button } from "ui";
import { useRouter } from "next/navigation";
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
  user?: User;
}
interface User {
  name?: String;
  image?: string;
}
interface recipients {
  user?: User;
  FYI: boolean;
  status: String;
}
interface sendVideos {
  recipients?: recipients[];
}
interface Video {
  video_id: String;
  comments?: Comment;
  title?: String;
  creator: User;
  sendVideos: sendVideos[];
}

interface NotificationTabProps {
  video?: Video;
  key?: Key;
}
const NotificationTab: React.FC<NotificationTabProps> = ({ key, video }) => {
  console.log("video in notification Tab", video);
  console.log("key in notification Tab", key);

  const title = video?.title || "Untitled Pulze";
  const truncatedTitle =
    title.length > 15 ? title.substring(0, 15) + "..." : title;
  const creatorName = video?.creator?.name;
  const creatorImage = video?.creator?.image;
  const recipients = video?.sendVideos?.[0]?.recipients;
  console.log("recipients", recipients);

  const imageUrl = video?.comments?.[0]?.user?.image;
  console.log("imageurl in parent:", imageUrl);
  const fyiRecipients = recipients?.filter(
    (recipient) => recipient.FYI === true
  );
  const nonFyiRecipients = recipients?.filter(
    (recipient) => recipient.FYI === false
  );
  const lastNonFyiRecipient = nonFyiRecipients?.[nonFyiRecipients.length - 1];
  const router = useRouter();

  return (
    <div
      className="flex flex-row rounded-lg shadow-xl justify-between mt-3 p-1 items-center content-center select-none cursor-pointer max-w-full"
      key={key}
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
            <AvatarDemo imageUrl={creatorImage} />
            <p className="font-semibold font-poppins text-[9px] pl-1.5 pt-1 text-[#474545]">
              by {creatorName}
            </p>
            <p className="font-normal font-poppins mt-1 pl-2 text-[9px] text-[#474545] tracking-wider">
              •Created 1 day before
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-start items-start  w-24">
        {recipients ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="   rounded-md h-9 flex justify-center items-center hover:bg-gray-200 outline-none ">
              <AvatarDemo imageUrl={undefined} />
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[236px]">
              <DropdownMenuLabel className="font-medium text-[16px] ">
                Assigned-{nonFyiRecipients?.length}
              </DropdownMenuLabel>
              {nonFyiRecipients?.map((recipient) => (
                <DropdownMenuItem>
                  <div className="flex justify-start  ">
                    <AvatarDemo imageUrl={recipient?.user?.image} />
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
                        Hasn't responded
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
                FYI-{fyiRecipients?.length}
              </DropdownMenuLabel>
              {fyiRecipients?.map((recipient) => (
                <DropdownMenuItem>
                  <div className="flex justify-start  ">
                    <AvatarDemo imageUrl={recipient?.user?.image} />
                    <div className="bg-re-500 font-poppins text-[10px] text-[#474545] ml-2 capitalize flex flex-col justify-start gap-0  ">
                      <span
                        className="font-semibold"
                        style={{ lineHeight: "10px" }}
                      >
                        {recipient?.user?.name}
                      </span>
                      <span
                        className="inline font-light "
                        style={{ lineHeight: "14px" }}
                      >
                        {recipient?.status ? recipient?.status : "no status"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button className="flex hover:bg-violet-200 group">
            <UserPlus size={16} className="group-hover:text-violet-400" />
            <p className="font-normal font-poppins mt-1 pl-2 text-[9px] text-[#474545] tracking-wider group-hover:text-violet-400">
              Ready to share
            </p>
          </button>
        )}
      </div>
      <div className="flex flex-row">
        <AvatarDemo imageUrl={imageUrl} />
        <div className="font-poppins text-[8px] text-[#474545] ml-2 capitalize">
          <p className="font-semibold">you said</p>
          <div className="flex inline font-light">
            <p>3d</p>
            <p className="ml-2">•hello</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-row items-center content-center">
        <SuccessIcon />
        <p className="text-[#42D55A] text-xs ml-2 tracking-wide">
          you responded
        </p>
      </div>
      <div className="hidden md:flex flex-row mr-10">
        <div className="mx-2 cursor-pointer">
          <LinkIcon />
        </div>
        <div className="mx-2 cursor-pointer">
          <DustbinIcon />
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;

"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const VideoScreenRecorder = dynamic(
  () =>
    import(
      "../../../../VideoScreenRecorder/components/VideoScreenRecorderRest"
    ),
  { ssr: false }
);
const VideoAndAudioRecorder = dynamic(
  () =>
    import("../../../../VideoScreenRecorder/components/VideoAndAudioRecorder"),
  { ssr: false }
);
const ScreenAndAudioRecorder = dynamic(
  () =>
    import("../../../../VideoScreenRecorder/components/ScreenAndAudioRecrding"),
  { ssr: false }
);
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { Button } from "ui";
import { Icons } from "ui/components/icons";
import { Checkbox } from "ui/components/checkbox";
import { Textarea } from "ui/components/textarea";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/components/tabs";
import ToggleButton from "../../../../dashboard/components/toggleButton";
// import ToggleButton from "../../../VideoScreenRecorder/components/toggleButton";

import {
  BookOpenCheck,
  CheckCircle2,
  ChevronsRight,
  Disc2,
  Dot,
  Mic,
  MicOff,
  Send,
  SendHorizontal,
  Trash,
  Trash2,
  Type,
  Video,
  VideoOff,
} from "lucide-react";
import TimeStamp from "./timestamp";
import { POST } from "../../../../api/auth/[...nextauth]/route";
// import { title } from "process";
import { formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";
// import VideoScreenRecorder from "../../../../VideoScreenRecorder/components/VideoScreenRecorder";
import {
  MyContextProvider,
  useMyContext,
} from "../../../../../context/MyContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  image: string;
}

interface Comment {
  type: String;
  replies: Comment[];
  parentCommentId: any;
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  timeStamp: String;
}
interface Creator {
  name: string;
  image: string;
  // Add other properties if needed
}
const initialCreator: Creator = {
  name: "",
  image: "",
  // Initialize other properties if needed
};
const GettinResponse = () => {
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [isTopCommentTextareaFocused, setIsTopCommentTextareaFocused] =
    useState(false);
  const [isReplyCommentTextareaFocused, setIsReplyCommentTextareaFocused] =
    useState(false);

  const [topcommenttextareaValue, setTopCommentTextareaValue] = useState("");
  const [replycommenttextareaValue, setReplyCommentTextareaValue] =
    useState("");
  const topCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const replyCommentTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // const videoId = "58fda409-4d60-4eb6-8e51-d17ce61c6c9c";
  // let videoId;

  // const userId = "d68e3f11-bdab-430f-9dc2-54c2c088864d";
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [timeStamp, setTimeStamp] = useState("3:15");
  const [parentCommentId, setparentCommentId] = useState("");
  const showFixedHeight = comments.length < 2;
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [postbuttonShow, setPostButtonShow] = useState(true);
  //for videoRecording
  const [recordedVideoLink, setRecordedVideoLink] = useState(null);

  const videoScreenRecorderRef = useRef(null);
  const cameraAudioRecorderRef = useRef(null);
  const screenAudioRecorderRef = useRef(null);

  const [isIcon1Visible, setIsIcon1Visible] = useState(true);
  const [isNotRecording, setIsNotRecording] = useState(true);
  const [mainCommentPostButtonShow, setMainCommentPostButtonShow] =
    useState(true);
  const [replyCommentPostButtonShow, setReplyCommentPostButtonShow] =
    useState(true);
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("");

  const [topLevelCommentTabsValue, setTopLevelCommentTabsValue] = useState("");
  const [replyCommentTabsValue, setReplyCommentTabsValue] = useState("text");

  const [moveToRecordingCompleted, setMoveToRecordingCompleted] =
    useState(false);

  const { resultVideosrccontext } = useMyContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [createdOnFromVideoPlayer, setcreatedOnFromVideoPlayer] = useState("");

  const [creatorFromVideoPlayer, setcreatorFromVideoPlayer] =
    useState<Creator>(initialCreator);
  const [videoStatus, setVideoStatus] = useState("");

  // const [userId, setUserId] = useState<string | undefined>(undefined);
  const opendStatus = "Opened";
  const respondedStatus = "Responded";
  const { data: session, status } = useSession();
  let userId;
  let userName;
  let image;
  if (session) {
    userId = session?.user?.id;
    userName = session?.user?.name;
    image = session?.user?.image;
    // setUserId(session?.user?.id);
  }
  console.log("userId", userId);

  const [hoveredMainCommentId, setHoveredMainCommentId] = useState(null);
  const [hoveredReplyCommentId, setHoveredReplyCommentId] = useState(null);

  // const [title, setTitle] = useState("");

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    if (currentTime !== null) {
      console.log("Current Time:", currentTime);
    }

    // Focus on the textarea
    if (topCommentTextareaRef.current) {
      topCommentTextareaRef.current.focus();
    }
  };

  const handleTopCommentTextareaFocus = () => {
    setIsTopCommentTextareaFocused(true);
  };

  const handleReplyCommentTextareaFocus = () => {
    setIsReplyCommentTextareaFocused(true);
  };

  const handleTopCommentTextareaBlur = () => {
    // setIsTextareaFocused(false);
  };
  const handleReplyCommentTextareaBlur = () => {
    // setIsTextareaFocused(false);
  };

  const handleTopCommentTextareaChange = (event) => {
    setTopCommentTextareaValue(event.target.value);
    console.log(topcommenttextareaValue);
  };

  const handleReplyCommentTextareaChange = (event) => {
    setReplyCommentTextareaValue(event.target.value);
    console.log(replycommenttextareaValue);
  };

  const showValue = () => {
    console.log(topcommenttextareaValue);
  };

  const formatTime = (time: number): string => {
    // Implement your time formatting logic here
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
  };

  const handleCommentId = (commentId) => {
    setActiveCommentId(commentId);
  };

  const fetchComments = async () => {
    try {
      console.log("videoId", videoId);

      const response = await fetch(
        `http://localhost:8080/api/comments/${videoId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      const parentComments = data.comments.filter(
        (comment) => !comment.parentCommentId
      );
      console.log("parentComments:", parentComments);
      // setComments(data.comments);
      // const sortedParentComments = [...parentComments].sort((a, b) => {
      //   // Convert createdAt strings to Date objects
      //   const dateA = new Date(a.createdAt);
      //   const dateB = new Date(b.createdAt);

      //   // Check if the dates are valid before performing the subtraction
      //   if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      //     // Handle invalid dates here if needed
      //     return 0; // Return 0 if unable to determine the order
      //   }

      //   // Perform the comparison
      //   return dateA.getTime() - dateB.getTime();
      // });
      const sortComments = (comments: Comment[]) => {
        return comments
          .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA.getTime() - dateB.getTime(); // Use getTime() to compare dates
          })
          .map((comment) => ({
            ...comment,
            replies: comment.replies ? sortComments(comment.replies) : [],
          }));
      };
      const sortedParentComments = sortComments(parentComments);

      setComments(sortedParentComments);

      console.log("Received data from API:", data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Include timeStamp in the request body only when the checkbox is checked

  let typeComment = "text";
  let typeReplyComment = "text";
  if (topLevelCommentTabsValue === "text") {
    typeComment = "text";
    // console.log(`set type:${typeComment}`);
  } else if (
    topLevelCommentTabsValue === "screen" ||
    topLevelCommentTabsValue === "camera"
  ) {
    typeComment = "video";
    // console.log(`set type:${typeComment}`);
    // console.log(topLevelCommentRequestBody);
  }
  if (replyCommentTabsValue === "text") {
    typeReplyComment = "text";
    console.log(`set replytype:${typeReplyComment}`);
  } else if (
    replyCommentTabsValue === "screen" ||
    replyCommentTabsValue === "camera"
  ) {
    typeReplyComment = "video";
    console.log(`set replytype:${typeReplyComment}`);
  }

  const topLevelCommentRequestBody = {
    content: topcommenttextareaValue,
    userId,
    timeStamp: isCheckboxChecked ? formatTime(currentTime ?? 0) : null,
    parentCommentId: null as string | null,
    type: typeComment, // Adjust the type based on your requirements
  };
  let replyCommentRequestBody = {
    content: replycommenttextareaValue,
    userId,
    timeStamp: isCheckboxChecked ? formatTime(currentTime ?? 0) : null,
    parentCommentId: null as string | null,
    type: typeReplyComment, // Adjust the type based on your requirements
  };
  if (topLevelCommentTabsValue === "text") {
    typeComment = "text";
    console.log(`set type:${typeComment}`);
    console.log(`toplevelCommentRequestbody${topLevelCommentRequestBody}`);
  } else if (
    topLevelCommentTabsValue === "screen" ||
    topLevelCommentTabsValue === "camera"
  ) {
    typeComment = "video";
    console.log(`set type:${typeComment}`);
    console.log("toplevelCommentRequestbody", topLevelCommentRequestBody);
  }

  const createComment = async (parentCommentId?: string) => {
    console.log("called create comment parnet");
    replyCommentRequestBody.parentCommentId = parentCommentId
      ? parentCommentId
      : null;
    try {
      console.log("isCheckboxChecked:", isCheckboxChecked);
      console.log("parnet comment from create comment:", parentCommentId);
      console.log("request body:", topLevelCommentRequestBody);

      console.log("formattedTime:", formatTime(currentTime ?? 0));
      const response = await fetch(
        `http://localhost:8080/api/comments/createcomment/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            parentCommentId
              ? replyCommentRequestBody
              : topLevelCommentRequestBody
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      // Assuming the response contains the newly created comment
      const newComment = await response.json();
      // fetchComments();
      // You can handle the new comment data as needed
      console.log("New Comment:", newComment);
      toast.success("New Comment Created");
      // Optionally, you can update the UI to include the new comment
      // For example, update a list of comments using setComments([...comments, newComment]);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
    try {
      await handleUpdateStatus(respondedStatus);
    } catch (error) {
      console.error("Coudnt update status");
    }
    await fetchComments();
  };

  const handleChange = (isChecked) => {
    // Your custom logic here
    console.log("Checkbox is checked:", isChecked);
    setIsCheckboxChecked(isChecked);
    return isChecked;

    // Call the original onChange handler if it exists
    // if (onChange) {
    //   onChange(e);
    // }
  };
  const handleCreateComment = async () => {
    console.log("called top level comment creation");
    // await handleUpdateStatus(respondedStatus);
    await createComment(); // Assuming you want to create a top-level comment here
  };

  //functions used for recording
  const handleRecordingComplete = (data) => {
    setRecordedVideoLink(data);
  };

  const handleToggle = (event) => {
    event.preventDefault();
    setIsIcon1Visible(!isIcon1Visible);
  };

  const handleStartRecording = (event) => {
    event.preventDefault();
    setMainCommentPostButtonShow(false);
    setReplyCommentPostButtonShow(false);
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (videoScreenRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };

  const handleStopRecording = async (event) => {
    event.preventDefault();

    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");
    try {
      await (videoScreenRecorderRef.current as any).stopRecording();
      setIsNotRecording(true);
      console.log(`resultvideosrc in grandparent:${resultVideosrccontext}`);
      setMoveToRecordingCompleted(true);
      setMainCommentPostButtonShow(true);
      setReplyCommentPostButtonShow(true);
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      // setIsRecording(true);
    }
  };
  const handleCameraAndAudioStartRecording = () => {
    setMainCommentPostButtonShow(false);
    setReplyCommentPostButtonShow(false);

    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (cameraAudioRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };

  const handleCameraAndAudioStopRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (cameraAudioRecorderRef.current as any).stopRecording();
    // setIsNotRecording(true);
    setIsNotRecording(true);
    setMoveToRecordingCompleted(true);
    setMainCommentPostButtonShow(true);
    setReplyCommentPostButtonShow(true);
  };

  const handleScreenAndAudioStartRecording = () => {
    setMainCommentPostButtonShow(false);
    setReplyCommentPostButtonShow(false);

    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (screenAudioRecorderRef.current as any).startRecording();
    setIsNotRecording(false);
  };

  const handleScreenAndAudioStopRecording = () => {
    console.log("hadleStartRecord111");

    console.log("hadleStartRecord222");

    (screenAudioRecorderRef.current as any).stopRecording();
    // setIsNotRecording(true);
    setMoveToRecordingCompleted(true);
    setIsNotRecording(true);
    setMainCommentPostButtonShow(true);
    setReplyCommentPostButtonShow(true);
  };
  const handleUpdateStatus = async (recipientVideoStatus: String) => {
    try {
      console.log("enterd updateStatus");

      const response = await fetch(
        "http://localhost:8080/api/updateRecipientStatus",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, videoId, recipientVideoStatus }),
        }
      );

      if (!response.ok) {
        console.log("Response from status update");
        // Handle non-successful response
        console.error(
          `Error updating recipient status: ${response.statusText}`
        );
        return;
      }

      const responseData = await response.json();
      if (responseData) {
        console.log("response Data from status Update", responseData.Status);
        setVideoStatus(responseData.Status);
      }
      return responseData;
      // Handle the response data if needed
    } catch (error) {
      // Handle errors
      console.error("Error updating recipient status:", error);
    }
  };
  const handleCreateVideoComment = async (event, parentCommentId?: string) => {
    event.preventDefault();

    console.log("called top level video comment creation");

    if (!parentCommentId) {
      if (topLevelCommentTabsValue === "screen") {
        console.log("have parentid ,createComment");

        await (videoScreenRecorderRef.current as any).createVideoComment(
          parentCommentId
        );
      } else if (
        topLevelCommentTabsValue === "camera" &&
        isIcon1Visible === true
      ) {
        console.log("have parentid ,createCameraComment");
        (cameraAudioRecorderRef.current as any).createVideoCameraComment(
          parentCommentId
        );
      } else if (
        topLevelCommentTabsValue === "camera" &&
        isIcon1Visible === false
      ) {
        console.log("have parentid ,createscreenComment");
        (screenAudioRecorderRef.current as any).createVideoScreenComment(
          parentCommentId
        );
      }
    } else {
      if (replyCommentTabsValue === "screen") {
        await (videoScreenRecorderRef.current as any).createVideoComment(
          parentCommentId
        );
      } else if (
        replyCommentTabsValue === "camera" &&
        isIcon1Visible === true
      ) {
        (cameraAudioRecorderRef.current as any).createVideoCameraComment(
          parentCommentId
        );
      } else if (
        replyCommentTabsValue === "camera" &&
        isIcon1Visible === false
      ) {
        (screenAudioRecorderRef.current as any).createVideoScreenComment(
          parentCommentId
        );
      }
    }
    try {
      if (videoStatus != "Responded") {
        await handleUpdateStatus(respondedStatus);
      }
    } catch (error) {
      console.error("coudnt update");
    }
    await fetchComments();
  };

  const handlePostButton = (selectedTab) => {
    // if (newValue === "screen") {
    // // Call your function here
    // setPostButtonShow(false);
    // console.log(postbuttonShow);
    console.log("selected Tab", selectedTab);
    // }
  };

  const handleTopLevelCommentTabsValue = (value) => {
    setTopLevelCommentTabsValue(value);
  };
  const handleReplyCommentTabsValue = (value) => {
    console.log("handleReplyCommentTabsValue", value);

    setReplyCommentTabsValue(value);
    // console.log(replyCommentTabsValue);
  };

  const handleTimeStampClick = (timeStamp) => {
    setSelectedTimeStamp(timeStamp);
  };
  const formattedDate = (unformattedTime) => {
    const parsedDate = parseISO(unformattedTime);
    const formattedDate = isToday(parsedDate)
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : isYesterday(parsedDate)
        ? `Yesterday ${formatDistanceToNow(parsedDate, { addSuffix: true })}`
        : formatDistanceToNow(parsedDate, { addSuffix: true });
    return formattedDate;
  };

  const handlecreatedAndCreatorOnFromVideoPlayer = (
    createdOn: string,
    creator: Object
  ) => {
    console.log("creator from function dashbaord", creator);

    setcreatedOnFromVideoPlayer(createdOn);
    setcreatorFromVideoPlayer(creator as Creator);
  };

  // Function to handle hover over a comment
  const handleMainCommentHover = (commentId) => {
    console.log("commentId from handleMainCommentHover", commentId);

    setHoveredMainCommentId(commentId);
  };

  // Function to handle mouse leave from a comment
  const handleMainCommentLeave = () => {
    setHoveredMainCommentId(null);
  };

  const handleReplyCommentHover = (commentId) => {
    console.log("commentId from handleReplyCommentHover", commentId);

    setHoveredReplyCommentId(commentId);
  };

  // Function to handle mouse leave from a comment
  const handleReplyCommentLeave = () => {
    setHoveredReplyCommentId(null);
  };

  const handleDeleteComment = async (commentId) => {
    console.log("called handleDeleteCommment and replyCommendID:", commentId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/deletecomment/${commentId}`,
        {
          method: "DELETE",
        }
      );
      console.log("response delete comment:", response);

      if (response.ok) {
        const comment = comments.find((comment) => comment.id === commentId);
        if (comment) {
          if (!comment.parentCommentId) {
            // It's a parent comment, filter it and its replies
            setComments((prevComments) =>
              prevComments.filter((c) => c.id !== commentId)
            );
          } else {
            // It's a reply, update the replies of its parent
            setComments((prevComments) =>
              prevComments.map((comment) => ({
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== commentId
                ),
              }))
            );
          }
          toast.success("Comment Deleted Successfully");
        }
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    let parts = pathname.split("/");
    setVideoId(parts[2]);
    // if (session) {
    //   userName = session?.user?.name;
    // }
    setTitle(decodeURIComponent(parts[3]));
    console.log("title", title);
    console.log("from useeffect", videoId, userId, status);

    if (videoId && userId && status) {
      console.log("from useeffect called");
      if (videoStatus === "") {
        handleUpdateStatus(opendStatus);
      }
    } else {
      console.log("couldnt update");
    }
    if (videoId) {
      fetchComments();
    }

    console.log("testing", videoId);
  }, [pathname, videoId, userId, videoStatus]);

  return (
    <>
      <div className="flex justify-left items-center bg-white w-full h-[42px]  ">
        <div className="flex w-48 justify-around  h-full items-center">
          <button
            className="hover:bg-slate-200 h-3/4"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left-to-line"
            >
              <path d="M3 19V5" />
              <path d="m13 6-6 6 6 6" />
              <path d="M7 12h14" className="" />
            </svg>
          </button>
          <p className="">{title}</p>
        </div>
      </div>
      <div className="flex flex-grow flex-col lg:flex-row">
        <div className="flex-[70%]  flex flex-col ">
          <div className="flex  h-16 gap-2 items-center ">
            <div className="ml-12">
              <img
                src={
                  creatorFromVideoPlayer.image
                    ? creatorFromVideoPlayer.image
                    : "/icons8-user-50.png"
                }
                className="w-[45px] h-[44.35px] rounded-full"
                alt="Picture of the author"
              />
            </div>

            <div className="flex gap-2">
              <span className="title text-xs font-semibold ">
                {creatorFromVideoPlayer.name}
              </span>
              <span className="subtitle text-xs font-light">
                {/* Created on 13 AUG 2019 */}
                {createdOnFromVideoPlayer}
              </span>
            </div>
          </div>
          <div className="flex    flex  justify-center md:items-start  h-full ">
            <div className="flex   items-center h-[185px]  lg:h-11/12 w-full  md:h-[400px] px-2 md:px-2 lg:px-10 md:px-0 ">
              <VideoPlayer
                onTimeUpdate={handleTimeUpdate}
                timeStamp={selectedTimeStamp}
                videoId={videoId}
                functionToPassCreatedOnToDashboard={
                  handlecreatedAndCreatorOnFromVideoPlayer
                }
              />
              {/* <VideoPlayer videoUrl="/docs/videos/flowbite.mp4" /> */}
            </div>
          </div>
        </div>
        <div className="flex-[30%] flex flex-col justify-between items-center lg:relative  ">
          <div className=" w-11/12 h-full ">
            {videoStatus && (
              <div className="h-16 w-full flex gap-3 flex items-center">
                <ChevronsRight stroke-width="1" />
                <div className="flex justify-center items-center gap-2 ">
                  <div>
                    {videoStatus === "Opened" ? (
                      <BookOpenCheck color="#42d55a" strokeWidth={1.5} />
                    ) : (
                      <CheckCircle2 color="#42d55a" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-[#42d55a]  mb-2">
                    you {videoStatus.toLowerCase()}
                  </span>
                </div>
              </div>
            )}

            {/* //384 */}
            <div
              className={` h-[130px] lg:h-[435px] max-w-full  flex flex-col justify-start scrollbar scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md overflow-y-auto overflow-x-hidden`}
            >
              {comments.map((comment) => {
                // const parsedDate =3;
                const isCurrentUserMainComment = userId === comment.user.id;
                const showDeleteButton =
                  isCurrentUserMainComment &&
                  comment.id === hoveredMainCommentId;
                return (
                  <div
                    className={`w-full   mt-2 bg-white flex flex-col gap-2 items-center rounded-xl border border-slate-300`}
                    key={comment.id}
                  >
                    <article className=" w-11/12 h-5/6 flex flex-col justify-start items-start font-poppins">
                      {/* <div className="bg-green-500 h-5 flex justify-start"> */}
                      <div
                        className=" w-full"
                        onMouseEnter={() => handleMainCommentHover(comment.id)}
                        onMouseLeave={handleMainCommentLeave}
                      >
                        <header className=" h-5 flex w-full items-center justify-between mt-2   ">
                          <div className=" h-full flex  items-center mt-2   ">
                            <img
                              src={
                                comment.user.image
                                  ? comment.user.image
                                  : "/icons8-user-50.png"
                              }
                              width={10}
                              height={10}
                              alt="Picture of the author"
                              className="rounded-full w-[24.35px] h-[24px] mt-1 mr-2"
                            />
                            <h1 className="text-md flex justify-center items-center font-medium text-[13px] truncate">
                              {comment.user.name}
                              {/* {comment.user.name.length > 5 ? (
                          <>{comment.user.name.slice(0, 5)}...</>
                        ) : (
                          comment.user.name
                        )} */}
                              {/* ... */}

                              <Dot
                                strokeWidth={1.5}
                                className="flex items-center mt-0.5"
                              />
                              {/* <p className="text-sm/[17px]">{comment.createdAt}</p> */}
                              <p className="font-light text-[13px] mr-10">
                                {formattedDate(comment.createdAt)}
                              </p>
                            </h1>
                          </div>
                          {showDeleteButton && (
                            <button
                              className="mr-4 mt-4 hover:text-red-500"
                              // className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash
                                size={20}
                                strokeWidth={0.75}
                                // fill="yellow"
                              />
                            </button>
                          )}
                        </header>
                        <section className={`w-full mt-2   `}>
                          <div
                            className={`flex gap-1   ${comment.timeStamp != null ? `ml-8` : `ml-8`} ${comment.type === "video" ? `flex flex-col` : `items-center`}`}
                          >
                            {comment.timeStamp != null &&
                              comment.timeStamp != "null" && (
                                <a
                                  href="#"
                                  className=""
                                  onClick={() =>
                                    handleTimeStampClick(comment.timeStamp)
                                  }
                                >
                                  <p className="text-gray-500 flex">
                                    <span className="text-violet-700 font-medium">
                                      {comment.timeStamp}
                                    </span>
                                  </p>
                                </a>
                              )}
                            {comment.type === "text" ? (
                              <p className="max-h-[50px] whitespace-normal break-all overflow-y-hidden hover:overflow-y-auto mt-0">
                                {comment.content}
                              </p>
                            ) : (
                              <>
                                {/* <div className="bg-red-500 h-[200px]"> */}
                                <video
                                  className="h-[170px] w-5/6 lg:mr-10 mt-0  rounded-r-lg rounded-l-lg"
                                  controls
                                >
                                  <source
                                    src={comment.content}
                                    type="video/mp4"
                                  />
                                </video>
                                {/* </div> */}
                              </>
                            )}
                          </div>
                        </section>
                      </div>
                      {comment.replies.map((reply, index) => {
                        const isCurrentUserReplyComment =
                          userId === reply.user.id;
                        const showDeleteButton =
                          isCurrentUserReplyComment &&
                          reply.id === hoveredReplyCommentId;
                        return (
                          <div
                            key={reply.id}
                            className="mt-0 ml-1  w-full "
                            onMouseEnter={() =>
                              handleReplyCommentHover(reply.id)
                            }
                            onMouseLeave={handleReplyCommentLeave}
                          >
                            <header className="h-5  flex w-full items-center justify-between mt-2 ">
                              <div className="h-full flex items-center mt-2 ">
                                <img
                                  src={
                                    reply.user.image
                                      ? reply.user.image
                                      : "/icons8-user-50.png"
                                  }
                                  width={10}
                                  height={10}
                                  alt="Picture of the author"
                                  className="rounded-full w-5 h-5 mt-1 mr-2"
                                />
                                <h1 className="text-md flex justify-center items-center font-medium text-[13px] truncate">
                                  {reply.user.name}
                                  {/* ... */}
                                  <Dot
                                    strokeWidth={1.5}
                                    className="flex items-center mt-0.5"
                                  />
                                  <p className=" font-light text-[13px] mr-10">
                                    {formattedDate(reply.createdAt)}
                                  </p>
                                </h1>
                              </div>
                              {showDeleteButton && (
                                <button
                                  className="mr-4 mt-4 hover:text-red-500"
                                  // className="bg-red-500 text-white px-2 py-1 rounded"
                                  onClick={() => handleDeleteComment(reply.id)}
                                >
                                  <Trash size={20} strokeWidth={0.75} />
                                </button>
                              )}
                            </header>{" "}
                            <section className="w-full mt-2  ">
                              <div
                                className={`flex gap-2 h-full ${comment.timeStamp != null ? `ml-7` : `ml-7`} ${comment.type === "video" ? `flex flex-col` : null}`}
                              >
                                {reply.timeStamp != "null" &&
                                  reply.timeStamp != null && (
                                    <a
                                      href="#"
                                      className=""
                                      onClick={() =>
                                        handleTimeStampClick(comment.timeStamp)
                                      }
                                    >
                                      <p className="text-gray-500 flex">
                                        <span className="text-violet-700 font-medium bg-red-500">
                                          {reply.timeStamp}
                                        </span>
                                      </p>
                                    </a>
                                  )}
                                {reply.type === "text" ? (
                                  <p className="max-h-[50px] whitespace-normal break-all overflow-y-hidden hover:overflow-y-auto mt-0  ">
                                    {reply.content}
                                  </p>
                                ) : (
                                  <video
                                    className="h-1/6 w-5/6 lg:mr-10  rounded-r-lg rounded-l-lg mt-2"
                                    controls
                                  >
                                    <source
                                      src={reply.content}
                                      type="video/mp4"
                                    />
                                  </video>
                                )}
                              </div>
                            </section>
                          </div>
                        );
                      })}

                      <form className="flex items-end  w-full   mt-2 ml-6 ">
                        {activeCommentId === comment.id ? (
                          <div className="flex flex-col     w-11/12 ">
                            <div className=" w-11/12  mt-2    flex  ">
                              <Tabs
                                defaultValue="text"
                                className="w-full h-full rounded-lg   "
                                onValueChange={handleReplyCommentTabsValue}
                              >
                                <TabsList className="flex h-1/3 justify-around items-center gap-2 bg-white focus:bg-gray-100">
                                  <TabsTrigger
                                    value="text"
                                    className="  w-1/3 ring-0 focus:bg-violet-300 bg-violet-200 flex gap-3 focus:ring-0"
                                  >
                                    <Type />
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="screen"
                                    className=" w-1/3 focus:bg-violet-300 bg-violet-200 flex  justify-center items-center"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="#000000"
                                      viewBox="0 0 32 32"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path d="M30 2.994h-28c-1.099 0-2 0.9-2 2v17.006c0 1.099 0.9 1.999 2 1.999h13v3.006h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3.006h13c1.099 0 2-0.9 2-1.999v-17.006c0-1.1-0.901-2-2-2zM30 22h-28v-17.006h28v17.006z"></path>{" "}
                                      </g>
                                    </svg>
                                    <p className="text-sm mb-1"> </p>
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="camera"
                                    className="  w-1/3 focus:bg-violet-300 bg-violet-200 flex gap-3"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                          d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                                          stroke="#000000"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>{" "}
                                      </g>
                                    </svg>
                                  </TabsTrigger>
                                  {/* <TabsTrigger
                                    value="upload"
                                    className="  w-1/3 ring-0 focus:bg-violet-300 bg-violet-200 flex gap-3 focus:ring-0"
                                  >
                                    <svg
                                      className="w-6 h-6"
                                      fill="#000000"
                                      viewBox="0 0 1024 1024"
                                      xmlns="http://www.w3.org/2000/svg"
                                      stroke="#000000"
                                      strokeWidth="19.456"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        <path d="M763.024 259.968C718.4 141.536 622.465 66.527 477.553 66.527c-184.384 0-313.392 136.912-324.479 315.536C64.177 410.495.002 501.183.002 603.903c0 125.744 98.848 231.968 215.823 231.968h92.448c17.664 0 32-14.336 32-32 0-17.68-14.336-32-32-32h-92.448c-82.304 0-152.832-76.912-152.832-167.968 0-80.464 56.416-153.056 127.184-165.216l29.04-5.008-2.576-29.328-.24-.368c0-155.872 102.576-273.44 261.152-273.44 127.104 0 198.513 62.624 231.537 169.44l6.847 22.032 23.056.496c118.88 2.496 223.104 98.945 223.104 218.77 0 109.055-72.273 230.591-181.696 230.591h-73.12c-17.664 0-32 14.336-32 32 0 17.68 14.336 32 32 32l72.88-.095c160-4.224 243.344-157.071 243.344-294.495 0-147.712-115.76-265.744-260.48-281.312zM535.985 514.941c-.176-.192-.241-.352-.354-.512l-8.095-8.464c-4.432-4.688-10.336-7.008-16.24-6.976-5.905-.048-11.777 2.288-16.289 6.975l-8.095 8.464c-.16.16-.193.353-.336.513L371.072 642.685c-8.944 9.344-8.944 24.464 0 33.84l8.064 5.471c8.945 9.344 23.44 6.32 32.368-3.024l68.113-75.935v322.432c0 17.664 14.336 32 32 32s32-14.336 32-32V603.34l70.368 77.631c8.944 9.344 23.408 12.369 32.336 3.025l8.064-5.472c8.945-9.376 8.945-24.496 0-33.84z"></path>
                                      </g>
                                    </svg>
                                  </TabsTrigger> */}
                                </TabsList>
                                <TabsContent
                                  value="text"
                                  className="w-full h-4/6 mb-4  "
                                >
                                  {/* Make changes to your account here. */}
                                  {/* <div className="flex bg-red-500 flex-col items-start w-full h-full"> */}
                                  <Textarea
                                    ref={replyCommentTextareaRef}
                                    placeholder="Add a comment"
                                    onFocus={handleReplyCommentTextareaFocus}
                                    onBlur={handleReplyCommentTextareaBlur}
                                    value={replycommenttextareaValue}
                                    onChange={handleReplyCommentTextareaChange}
                                    className="w-full h-full bg-gray-200"
                                  />
                                  {/* </div> */}
                                </TabsContent>
                                <TabsContent
                                  value="screen"
                                  className="flex flex-col justify-between items-center  h-5/6"
                                >
                                  <div className="w-full  flex h-5/6 ">
                                    <VideoScreenRecorder
                                      onRecordingComplete={
                                        handleRecordingComplete
                                      }
                                      playerRef={videoScreenRecorderRef}
                                      title={undefined}
                                      description={undefined}
                                      videoId={videoId}
                                      requestBody={replyCommentRequestBody}
                                      typeComment1={typeReplyComment}
                                      saveVideoAfterStopRecordingOrNot={false}
                                      onRecordingCompleteAndGettingVideoId={
                                        undefined
                                      }
                                      selectWorkspace={undefined}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start w-full ml-9 gap-3  mr-10 ">
                                    {/* <div className=" w-full flex gap-2 ml-2">
                                      <ToggleButton
                                        icon1={
                                          <Video
                                            color="#000000"
                                            className="w-5 h-5"
                                          />
                                        }
                                        icon2={<VideoOff className="w-4 h-4" />}
                                        isIcon1Visible={isIcon1Visible}
                                        onToggle={() => handleToggle(event)}
                                      />
                                      <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                                        <span className="ml-3">
                                          Camera Access
                                        </span>
                                        <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                          Allow
                                        </Button>
                                      </div>
                                    </div>
                                    <div className=" w-full flex gap-2 ml-2">
                                      <ToggleButton
                                        icon1={
                                          <Mic
                                            color="#000000"
                                            className="w-5 h-5"
                                          />
                                        }
                                        icon2={
                                          <MicOff
                                            color="#000000"
                                            className="w-5 h-5"
                                          />
                                        }
                                        isIcon1Visible={isIcon1Visible}
                                        onToggle={() => handleToggle(event)}
                                      />
                                      <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                                        <span className="ml-3">
                                          Microphone Access
                                        </span>
                                        <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                          Allow
                                        </Button>
                                      </div>
                                    </div> */}
                                    {/* </div> */}

                                    <div className=" w-full  flex justify-center">
                                      {isNotRecording ? (
                                        <Button
                                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                                          onClick={handleStartRecording}
                                        >
                                          <Disc2 />
                                          Start Recording
                                        </Button>
                                      ) : (
                                        <Button
                                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                                          onClick={handleStopRecording}
                                        >
                                          <Disc2 />
                                          Stop Recording
                                        </Button>
                                      )}

                                      {/* <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStartRecording}
                         >
                          <Disc2 />
                          Start Recording
                         </Button>
                          <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStopRecording}
                         >
                          <Disc2 />
                          Stop Recording
                         </Button> */}
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent
                                  value="camera"
                                  className="flex flex-col justify-between items-center  h-full"
                                >
                                  <div className="w-full flex h-5/6  ">
                                    {isIcon1Visible ? (
                                      <VideoAndAudioRecorder
                                        onRecordingComplete={
                                          handleRecordingComplete
                                        }
                                        playerRef={cameraAudioRecorderRef}
                                        title={undefined}
                                        description={undefined}
                                        saveVideoAfterStopRecordingOrNot={false}
                                        onRecordingCompleteAndGettingVideoId={
                                          undefined
                                        }
                                        requestBody={replyCommentRequestBody}
                                        typeComment1={typeReplyComment}
                                        videoId={videoId}
                                        selectWorkspace={undefined}
                                      />
                                    ) : (
                                      <ScreenAndAudioRecorder
                                        onRecordingComplete={
                                          handleRecordingComplete
                                        }
                                        playerRef={screenAudioRecorderRef}
                                        title={undefined}
                                        description={undefined}
                                        saveVideoAfterStopRecordingOrNot={false}
                                        onRecordingCompleteAndGettingVideoId={
                                          undefined
                                        }
                                        requestBody={replyCommentRequestBody}
                                        typeComment1={typeReplyComment}
                                        videoId={videoId}
                                        selectWorkspace={undefined}
                                      />
                                    )}
                                  </div>

                                  <div className="flex flex-col items-start w-full ml-9   gap-3 mr-10  ">
                                    {/* {moveToRecordingCompleted === false ? ( */}
                                    <div className=" w-full flex gap-2 ml-2">
                                      <ToggleButton
                                        icon1={
                                          <Video
                                            color="#000000"
                                            className="w-5 h-5"
                                          />
                                        }
                                        icon2={
                                          <VideoOff
                                            color="#000000"
                                            className="w-5 h-5"
                                          />
                                        }
                                        isIcon1Visible={isIcon1Visible}
                                        onToggle={() => handleToggle(event)}
                                      />
                                      <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                                        <span className="ml-3">
                                          Camera Access
                                        </span>
                                        <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                                          Allow
                                        </Button>
                                      </div>
                                    </div>
                                    {/* ) : null} */}
                                    <div className=" w-full flex gap-2 ml-2">
                                      {/* <ToggleButton
                          icon1={<Mic color="#000000" className="w-5 h-5" />}
                          icon2={<MicOff color="#000000" className="w-5 h-5" />}
                          isIcon1Visible={isIcon1Visible}
                          onToggle={handleToggle}
                        /> */}
                                      {/* <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Microphone Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div> */}
                                    </div>
                                    {/* </div> */}

                                    <div className=" w-full  flex justify-center">
                                      {isNotRecording ? (
                                        <Button
                                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                                          onClick={
                                            isIcon1Visible
                                              ? handleCameraAndAudioStartRecording
                                              : handleScreenAndAudioStartRecording
                                          }
                                        >
                                          <Disc2 />
                                          Start Recording
                                        </Button>
                                      ) : (
                                        <>
                                          <div>{moveToRecordingCompleted}</div>
                                          <Button
                                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                                            onClick={
                                              isIcon1Visible
                                                ? handleCameraAndAudioStopRecording
                                                : handleScreenAndAudioStopRecording
                                            }
                                          >
                                            <Disc2 />
                                            Stop Recording
                                          </Button>
                                        </>
                                      )}
                                      {/* {isNotRecording ? (
                          <Button
                            className="w-full flex justify-center gap-2 bg-green-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStartRecording}
                          >
                            <Disc2 />
                            Start Recording 2
                          </Button>
                        ) : (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStopRecording}
                          >
                            <Disc2 />
                            Stop Recording
                          </Button>
                        )} */}
                                    </div>
                                  </div>
                                </TabsContent>
                                {/* <TabsContent
                                  value="upload"
                                  className="flex justify-center"
                                >
                                  Change your password here.
                                </TabsContent> */}
                              </Tabs>
                            </div>
                            <div
                              className={`flex    w-11/12 mb-6  justify-start`}
                            >
                              {/* {currentTime !== null || isTextareaFocused ? (
                                currentTime !== null ? (
                                  <div className="flex justify-start gap-2">
                                    <Checkbox
                                      // onChange={(e) => {
                                      //   console.log("hello");
                                      //   if (e) {
                                      //   }
                                      //   if ((e.target as HTMLInputElement).checked) {
                                      //     console.log("✅ Checkbox is checked");
                                      //   }
                                      //   setIsCheckboxChecked(
                                      //     (e.target as HTMLInputElement).checked
                                      //   );
                                      // }}
                                      onChange={handleChange}
                                    />
                                    <TimeStamp
                                      currentTime={formatTime(currentTime)}
                                    />
                                  </div>
                                ) : (
                                  <span className="subtitle font-light flex justify-center gap-2  ">
                                    <Checkbox />{" "}
                                    <p className="text-xs">Insert at 0:00</p>
                                  </span>
                                )
                              ) : null} */}

                              <Button
                                variant="default"
                                size="sm" // You can adjust the size here
                                disabled={!replyCommentPostButtonShow}
                                // onClick={() => createComment(comment.id)}
                                onClick={(event) => {
                                  replyCommentTabsValue === "text"
                                    ? createComment(comment.id)
                                    : handleCreateVideoComment(
                                        event,
                                        comment.id
                                      );
                                }}
                                // onClick={
                                //   typeReplyComment === "text"
                                //     ? () => createComment(comment.id)
                                //     : typeReplyComment === "video"
                                //       ? () =>
                                //           handleCreateVideoComment(comment.id)
                                //       : () => createComment(comment.id)
                                // }
                                className="bg-violet-600 hover:bg-violet-700 w-full mt-6"
                              >
                                Post <Send />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Reply"
                            onClick={() => handleCommentId(comment.id)}
                            className="max-h-[50px] whitespace-normal break-all overflow-y-hidden  hover:overflow-y-auto focus:outline-none rounded-sm mb-4 border border-slate-300 pl-2 "
                          />
                        )}
                      </form>

                      {/* </div> */}
                      {/* <div className="flex"></div> */}
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className="bg-white  h-[171px] min-h-[300px] rounded-lg  w-11/12 mb-4 flex items-center justify-center   "> */}
          <div className="bg-white lg:absolute right-0 bottom-0 min-h-[100px]  lg:min-h-[171px] rounded-xl border border-slate-300 w-[690px] lg:w-11/12  mb-4 flex items-start  justify-center mr-5   ">
            <div className=" w-2/12 flex justify-end items-start ">
              <img
                src={image ? image : "/icons8-user-50.png"}
                className="w-[35px] lg:w-[35px] h-[35px] lg:h-[35.3px] rounded-full mt-2 mr-2 border-2"
                alt="Picture of the author"
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-white   h-5/6 w-10/12">
              <div className="h-4/6 w-11/12    flex justify-center items-center">
                <Tabs
                  defaultValue="text"
                  onSelect={handlePostButton}
                  className="w-full h-full rounded-lg    "
                  onValueChange={handleTopLevelCommentTabsValue}

                  // onChange={handlePostButton}
                >
                  <TabsList className="flex h-1/3 justify-around items-center gap-2 bg-white focus:bg-gray-100">
                    <TabsTrigger
                      value="text"
                      className="  w-1/3 ring-0 focus:bg-violet-300 bg-violet-200 flex gap-3 focus:ring-0"
                    >
                      <Type />
                    </TabsTrigger>
                    <TabsTrigger
                      value="screen"
                      // onClick={() => {
                      //   handlePostButton();
                      // }}
                      className=" w-1/3 focus:bg-violet-300 bg-violet-200 flex  justify-center items-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M30 2.994h-28c-1.099 0-2 0.9-2 2v17.006c0 1.099 0.9 1.999 2 1.999h13v3.006h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3.006h13c1.099 0 2-0.9 2-1.999v-17.006c0-1.1-0.901-2-2-2zM30 22h-28v-17.006h28v17.006z"></path>{" "}
                        </g>
                      </svg>
                      <p className="text-sm mb-1"> </p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="camera"
                      className="  w-1/3 focus:bg-violet-300 bg-violet-200 flex gap-3"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="upload"
                      className="  w-1/3 ring-0 focus:bg-violet-300 bg-violet-200 flex gap-3 focus:ring-0"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                        strokeWidth="19.456"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M763.024 259.968C718.4 141.536 622.465 66.527 477.553 66.527c-184.384 0-313.392 136.912-324.479 315.536C64.177 410.495.002 501.183.002 603.903c0 125.744 98.848 231.968 215.823 231.968h92.448c17.664 0 32-14.336 32-32 0-17.68-14.336-32-32-32h-92.448c-82.304 0-152.832-76.912-152.832-167.968 0-80.464 56.416-153.056 127.184-165.216l29.04-5.008-2.576-29.328-.24-.368c0-155.872 102.576-273.44 261.152-273.44 127.104 0 198.513 62.624 231.537 169.44l6.847 22.032 23.056.496c118.88 2.496 223.104 98.945 223.104 218.77 0 109.055-72.273 230.591-181.696 230.591h-73.12c-17.664 0-32 14.336-32 32 0 17.68 14.336 32 32 32l72.88-.095c160-4.224 243.344-157.071 243.344-294.495 0-147.712-115.76-265.744-260.48-281.312zM535.985 514.941c-.176-.192-.241-.352-.354-.512l-8.095-8.464c-4.432-4.688-10.336-7.008-16.24-6.976-5.905-.048-11.777 2.288-16.289 6.975l-8.095 8.464c-.16.16-.193.353-.336.513L371.072 642.685c-8.944 9.344-8.944 24.464 0 33.84l8.064 5.471c8.945 9.344 23.44 6.32 32.368-3.024l68.113-75.935v322.432c0 17.664 14.336 32 32 32s32-14.336 32-32V603.34l70.368 77.631c8.944 9.344 23.408 12.369 32.336 3.025l8.064-5.472c8.945-9.376 8.945-24.496 0-33.84z"></path>
                        </g>
                      </svg>
                    </TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="text" className="w-full h-4/6   ">
                    {/* Make changes to your account here. */}
                    {/* <div className="flex bg-red-500 flex-col items-start w-full h-full"> */}
                    <Textarea
                      ref={topCommentTextareaRef}
                      placeholder="Add a comment"
                      onFocus={handleTopCommentTextareaFocus}
                      onBlur={handleTopCommentTextareaBlur}
                      value={topcommenttextareaValue}
                      onChange={handleTopCommentTextareaChange}
                      className="w-full h-full bg-gray-200"
                    />
                    {/* </div> */}
                  </TabsContent>
                  <TabsContent
                    value="screen"
                    className="flex flex-col justify-between items-center  h-full"
                  >
                    <div className="w-full  flex h-5/6 ">
                      <VideoScreenRecorder
                        onRecordingComplete={handleRecordingComplete}
                        playerRef={videoScreenRecorderRef}
                        title={undefined}
                        description={undefined}
                        videoId={videoId}
                        requestBody={topLevelCommentRequestBody}
                        typeComment1={typeComment}
                        saveVideoAfterStopRecordingOrNot={false}
                        onRecordingCompleteAndGettingVideoId={undefined}
                        selectWorkspace={undefined}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full ml-9 gap-3  mr-10 ">
                      {/* <div className=" w-full flex gap-2 ml-2"> */}
                      {/* <ToggleButton
                          icon1={<Video color="#000000" className="w-5 h-5" />}
                          icon2={<VideoOff className="w-4 h-4" />}
                          isIcon1Visible={isIcon1Visible}
                          onToggle={() => handleToggle(event)}
                        />
                        <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Camera Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div>
                      </div>
                      <div className=" w-full flex gap-2 ml-2">
                        <ToggleButton
                          icon1={<Mic color="#000000" className="w-5 h-5" />}
                          icon2={<MicOff color="#000000" className="w-5 h-5" />}
                          isIcon1Visible={isIcon1Visible}
                          onToggle={() => handleToggle(event)}
                        />
                        <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Microphone Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div>
                      </div> */}
                      {/* </div> */}

                      <div className=" w-full  flex justify-center">
                        {isNotRecording ? (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleStartRecording}
                          >
                            <Disc2 />
                            Start Recording
                          </Button>
                        ) : (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleStopRecording}
                          >
                            <Disc2 />
                            Stop Recording
                          </Button>
                        )}
                        {/* <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStartRecording}
                        >
                          <Disc2 />
                          Start Recording
                        </Button>
                        <Button
                          className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                          onClick={handleStopRecording}
                        >
                          <Disc2 />
                          Stop Recording
                        </Button> */}
                      </div>
                    </div>{" "}
                  </TabsContent>
                  <TabsContent
                    value="camera"
                    className="flex flex-col justify-between items-center  h-full"
                  >
                    <div className="w-full flex h-5/6  ">
                      {isIcon1Visible ? (
                        <VideoAndAudioRecorder
                          onRecordingComplete={handleRecordingComplete}
                          playerRef={cameraAudioRecorderRef}
                          title={undefined}
                          description={undefined}
                          saveVideoAfterStopRecordingOrNot={false}
                          onRecordingCompleteAndGettingVideoId={undefined}
                          requestBody={topLevelCommentRequestBody}
                          typeComment1={typeComment}
                          videoId={videoId}
                          selectWorkspace={undefined}
                        />
                      ) : (
                        <ScreenAndAudioRecorder
                          onRecordingComplete={handleRecordingComplete}
                          playerRef={screenAudioRecorderRef}
                          title={undefined}
                          description={undefined}
                          saveVideoAfterStopRecordingOrNot={false}
                          onRecordingCompleteAndGettingVideoId={undefined}
                          requestBody={topLevelCommentRequestBody}
                          typeComment1={typeComment}
                          videoId={videoId}
                          selectWorkspace={undefined}
                        />
                      )}
                    </div>

                    <div className="flex flex-col items-start w-full ml-9   gap-3 mr-10  ">
                      {/* {moveToRecordingCompleted === false ? ( */}
                      <div className=" w-full flex gap-2 ml-2">
                        <ToggleButton
                          icon1={<Video color="#000000" className="w-5 h-5" />}
                          icon2={
                            <VideoOff color="#000000" className="w-5 h-5" />
                          }
                          isIcon1Visible={isIcon1Visible}
                          onToggle={() => handleToggle(event)}
                        />
                        <div className="bg-white w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Camera Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div>
                      </div>
                      {/* ) : null} */}
                      <div className=" w-full flex gap-2 ml-2">
                        {/* <ToggleButton
                          icon1={<Mic color="#000000" className="w-5 h-5" />}
                          icon2={<MicOff color="#000000" className="w-5 h-5" />}
                          isIcon1Visible={isIcon1Visible}
                          onToggle={handleToggle}
                        /> */}
                        {/* <div className="bg-white  w-5/6 rounded-lg flex  items-center justify-between">
                          <span className="ml-3">Microphone Access</span>
                          <Button className="bg-white text-violet-600  hover:text-violet-900 hover:bg-white">
                            Allow
                          </Button>
                        </div> */}
                      </div>
                      {/* </div> */}

                      <div className=" w-full  flex justify-center">
                        {isNotRecording ? (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={
                              isIcon1Visible
                                ? handleCameraAndAudioStartRecording
                                : handleScreenAndAudioStartRecording
                            }
                          >
                            <Disc2 />
                            Start Recording
                          </Button>
                        ) : (
                          <>
                            <div>{moveToRecordingCompleted}</div>
                            <Button
                              className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                              onClick={
                                isIcon1Visible
                                  ? handleCameraAndAudioStopRecording
                                  : handleScreenAndAudioStopRecording
                              }
                            >
                              <Disc2 />
                              Stop Recording
                            </Button>
                          </>
                        )}
                        {/* {isNotRecording ? (
                          <Button
                            className="w-full flex justify-center gap-2 bg-green-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStartRecording}
                          >
                            <Disc2 />
                            Start Recording 2
                          </Button>
                        ) : (
                          <Button
                            className="w-full flex justify-center gap-2 bg-red-400 hover:bg-red-500 mb-3 mx-2"
                            onClick={handleScreenAndAudioStopRecording}
                          >
                            <Disc2 />
                            Stop Recording
                          </Button>
                        )} */}
                      </div>
                    </div>
                  </TabsContent>
                  {/* <TabsContent value="upload" className="flex justify-center">
                    Change your password here.
                  </TabsContent> */}
                </Tabs>
              </div>
              <div
                className={`flex items-start  w-11/12 mt-  ${
                  !currentTime && !isTopCommentTextareaFocused
                    ? "justify-end"
                    : "justify-between"
                }`}
              >
                {currentTime !== null || isTopCommentTextareaFocused ? (
                  currentTime !== null ? (
                    <div className="flex justify-start gap-2 mt-2">
                      <Checkbox
                        // onChange={(e) => {
                        //   console.log("hello");
                        //   if (e) {
                        //   }
                        //   if ((e.target as HTMLInputElement).checked) {
                        //     console.log("✅ Checkbox is checked");
                        //   }
                        //   setIsCheckboxChecked(
                        //     (e.target as HTMLInputElement).checked
                        //   );
                        // }}
                        // onChange={handleChange}
                        onCheckedChange={handleChange}
                      />
                      <TimeStamp currentTime={formatTime(currentTime)} />
                    </div>
                  ) : (
                    <span className="subtitle font-light flex justify-center gap-2  ">
                      <Checkbox /> <p className="text-xs">Insert at 0:00</p>
                    </span>
                  )
                ) : null}
                {postbuttonShow ? (
                  <Button
                    variant="default"
                    size="sm" // You can adjust the size here
                    // disabled={!textareaValue}
                    // onClick={handleCreateComment}
                    onClick={
                      typeComment === "text"
                        ? handleCreateComment
                        : typeComment === "video"
                          ? handleCreateVideoComment
                          : handleCreateComment
                    }
                    className="bg-violet-600 hover:bg-violet-700 mb-4 w-2/5 "
                    disabled={!mainCommentPostButtonShow}
                  >
                    Post <Send />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettinResponse;

{
}

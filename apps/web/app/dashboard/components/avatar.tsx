import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components//avatar";
interface AvatarDemoProps {
  imageUrl?: string;
}
export const AvatarDemo: React.FC<AvatarDemoProps> = ({ imageUrl }) => {
  console.log("imageUrl in avatar", imageUrl);
  const image =
    imageUrl === undefined
      ? "https://avatars.githubusercontent.com/u/124599?v=4"
      : imageUrl;

  return (
    <img className="w-5 h-5 rounded-full" src={image} alt="Rounded avatar" />
  );
};

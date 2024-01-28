import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components//avatar";

export function AvatarDemo() {
  return (
    <img
      className="w-5 h-5 rounded-full"
      src="https://avatars.githubusercontent.com/u/124599?v=4"
      alt="Rounded avatar"
    />
  );
}

import React, { useState } from "react";
import Image from "next/image";
import VideoPlayer from "./components/VideoPlayer";
import { Button } from "ui";
import { Icons } from "ui/components/icons";
import { Checkbox } from "ui/components/checkbox";
import { Textarea } from "ui/components/textarea";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/components/tabs";
import ToggleButton from "../../../VideoScreenRecorder/components/toggleButton";
import { Send, SendHorizontal, Type } from "lucide-react";
import TimeStamp from "./components/timestamp";
import GettinResponse from "./components/gettingResponse";

const page = () => {
  return (
    <div className="font-poppins bg-gray-200 min-h-screen w-screen flex flex-col overflow-hidden ">
      <GettinResponse />
    </div>
  );
};

export default page;

{
}

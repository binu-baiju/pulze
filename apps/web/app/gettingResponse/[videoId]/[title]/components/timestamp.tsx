import React from "react";
import { Checkbox } from "ui/components/checkbox";

interface TimeStampProps {
  currentTime: string | null;
}

const TimeStamp: React.FC<TimeStampProps> = ({ currentTime }) => {
  const formatTime = (time: number): string => {
    // Implement your time formatting logic here
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
  };

  return (
    <div className="flex flex-row justify-center gap-2">
      {currentTime !== null && (
        <span className="subtitle text-xs font-light">
          Insert at {currentTime}
        </span>
      )}
    </div>
  );
};

export default TimeStamp;

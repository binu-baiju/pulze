"use client";
import React, { useState } from "react";
import { Button } from "ui/components/button";

interface ToggleButtonProps {
  icon1: JSX.Element;
  icon2: JSX.Element;
  isIcon1Visible?: boolean;
  onToggle?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon1,
  icon2,
  isIcon1Visible,
  onToggle,
}) => {
  // const [isIcon1Visible, setIsIcon1Visible] = useState(true);

  // const toggleIcon = () => {
  //   setIsIcon1Visible(!isIcon1Visible);
  // };

  return (
    <Button className="bg-white hover:bg-inherit" size="sm" onClick={onToggle}>
      {isIcon1Visible ? icon1 : icon2}
    </Button>
  );
};

export default ToggleButton;

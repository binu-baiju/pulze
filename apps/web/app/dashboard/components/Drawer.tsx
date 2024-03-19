"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (toggle: boolean) => void;
}
const Drawer = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const handleDrawerToggle = () => {
    setIsOpen(false);
  };
  const tabs = ["General", "Members"];

  return (
    <>
      {/* Drawer component */}
      <div
        id="drawer-contact"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? "" : "-translate-x-full"
        } bg-white w-80 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-contact-label"
      >
        {/* Drawer header */}
        <h5
          id="drawer-contact-label"
          className="inline-flex items-center mb-6 font-semibold text-lg font-poppins"
        >
          WorkSpace Setting
        </h5>

        {/* Button to close the drawer */}
        <button
          type="button"
          onClick={handleDrawerToggle}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
    </>
  );
};

export default Drawer;

import { useState } from "react";
import { Input } from "ui/components/input";
import { Button } from "ui/components/button";

const WorkspaceSettingsPopup = () => {
  const [activeTab, setActiveTab] = useState("general");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div
        id="drawer-example"
        className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          <svg
            className="w-4 h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Info
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Supercharge your hiring by taking advantage of our{" "}
          <a
            href="#"
            className="text-blue-600 underline dark:text-blue-500 hover:no-underline"
          >
            limited-time sale
          </a>{" "}
          for Flowbite Docs + Job Board. Unlimited access to over 190K
          top-ranked candidates and the #1 design job board.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Learn more
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Get access{" "}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-96 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Workspace Settings</h2>
          <div className="flex justify-between border-b-2 mb-4">
            <button
              className={`focus:outline-none ${
                activeTab === "general" ? "font-bold" : ""
              }`}
              onClick={() => toggleTab("general")}
            >
              General
            </button>
            <button
              className={`focus:outline-none ${
                activeTab === "member" ? "font-bold" : ""
              }`}
              onClick={() => toggleTab("member")}
            >
              Member
            </button>
          </div>
          {activeTab === "general" && (
            <div className="General Setting Layout">
              <p className="font-poppins font-semibold text-sm">
                Workspace name
              </p>
              <div className="flex flex-col justify-between items-center">
                <Input
                  id="workspace-name"
                  placeholder="Workspace Name"
                  className="bg-[#CACACA]"
                />
                <button
                  type="submit"
                  className="font-Inter font-semibold text-lg bg-[#8645FF] rounded-md"
                >
                  Save
                </button>
              </div>
              <div className="flex flex-col jjustify-between items-center">
                <p className="text-[#474545] font-poppins text-sm font-light">
                  Anyone with the link can join the pulse
                </p>
                <button
                  type="submit"
                  className="font-Inter font-semibold text-lg bg-[#8645FF] rounded-md"
                >
                  Copy Link
                </button>
              </div>
              <div className="place-items-end"></div>
              <div>
                <button
                  type="submit"
                  className="font-Inter font-semibold text-lg bg-[#DC2626] rounded-md"
                >
                  Leave Workspace
                </button>
                <button
                  type="submit"
                  className="font-Inter font-semibold text-lg bg-[#DC2626] rounded-md"
                >
                  Delete Workspace
                </button>
              </div>
            </div>
          )}
          {activeTab === "member" && (
            <div className="Member Setting Layout">
              <p>Member Settings Content Goes Here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettingsPopup;

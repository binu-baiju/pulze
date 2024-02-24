import { useState } from "react";
import { Input } from "ui/components/input";

const WorkspaceSettingsPopup = () => {
  const [activeTab, setActiveTab] = useState("general");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
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
            <p className="font-poppins font-semibold text-sm">Workspace name</p>
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
  );
};

export default WorkspaceSettingsPopup;

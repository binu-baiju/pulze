import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";
import { WorkSpaceSet } from "../../workspace/components/workspaceset";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { workspace } from "./dashboard";
import { AlarmClockOffIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  allWorkspaces: Array<workspace>;
  selectedWorkspace: workspace;
  setSelectedWorkspace: (workspace: workspace) => void;
}

export interface WorkspaceProps {
  selectedWorkspace: workspace;
  updateWorkspace: (workspace: workspace) => void;
}
const DropDown = (props: Props) => {
  const [showInviting, setShowInviting] = useState(false);
  const [showWorkSpace, setShowWorkspace] = useState(false);
  const [showCreateWorkSpace, setShowCreateWorkspace] = useState(false);
  const toggleInviting = () => {
    setShowInviting(!showInviting);
  };

  const toggleWorkSpace = () => {
    setShowWorkspace(!showWorkSpace);
  };

  const toggleCreateWorkSpace = () => {
    setShowCreateWorkspace(!showCreateWorkSpace);
  };

  const toggleAll = () => {
    toggleInviting();
    toggleWorkSpace();
    toggleCreateWorkSpace();
  };
  return (
    <div className="flex flex-col w-48 text-[#0F172A]">
      <div
        className="flex flex-row justify-center items-center cursor-pointer"
        onClick={toggleAll}
      >
        <span className="text-[#0F172A] font-poppins font-semibold relative">
          {props.selectedWorkspace?.name}
        </span>
        <IoIosArrowDown />
      </div>
      {showWorkSpace && (
        <>
          <div className="flex flex-col justify-center ml-12 items-center absolute top-40">
            {props.allWorkspaces.map((workspace: workspace) => {
              return (
                <div
                  className="flex flex-row justify-center items-center"
                  onClick={() => props.setSelectedWorkspace(workspace)}
                >
                  <div className="mx-4">{workspace.name}</div>
                  {workspace.workspace_id ==
                  props.selectedWorkspace?.workspace_id ? (
                    <div>
                      <FaCheck />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col relative">
            <p>
              <a className="flex flex-row items-center absolute top-16 font-normal text-sm  font-[Inter] text-left mx-3 my-3">
                <WorkSpaceSet
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
              </a>
            </p>
            <p>
              <a className="flex flex-row font-[Inter] absolute top-20 font-normal text-sm text-left items-center  mx-3 my-6">
                <Inviting
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
              </a>
            </p>
            <p>
              <a className="flex flex-row font-[Inter] absolute top-24 font-normal text-sm text-left items-center mx-3 my-9 ">
                <CreatingWorkspace
                  selectedWorkspace={props.selectedWorkspace}
                  updateWorkspace={props.setSelectedWorkspace}
                />
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DropDown;

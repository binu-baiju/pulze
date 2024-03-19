import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";

import { WorkSpaceSet } from "../../workspace/components/workspaceset";

const DropDown = () => {
  return (
    <div className="flex flex-col  mt-4 text-[#0F172A] border-2 border-sky-600 ">
      <span className="text-[#0F172A] text-left font-poppins font-semibold ">
        Binu Baiju's team
      </span>
      <div className="flex flex-col">
        <p>
          <a className="flex flex-row items-center font-normal text-sm  m-1 font-[Inter] text-left ">
            <WorkSpaceSet />
          </a>
        </p>
        <p>
          <a className="flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
            <Inviting />
          </a>
        </p>
        <p>
          <a className="flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
            <CreatingWorkspace />
          </a>
        </p>
      </div>
    </div>
  );
};

export default DropDown;

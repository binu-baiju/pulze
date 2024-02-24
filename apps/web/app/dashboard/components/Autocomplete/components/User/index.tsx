import React from "react";
import Image from "next/image";
import { User as UserType } from "../../../../../../types/index";

interface UserListProps {
  users: UserType[];
  handleRemove: (user: UserType) => void;
  lastSelectedIndex: number | null;
  handleToggle: (user: UserType) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  handleRemove,
  lastSelectedIndex,
  handleToggle,
}) => (
  <div className="flex flex-col gap-px ">
    {users.map((user, index) => (
      <li
        key={user.id}
        className={`flex justify-between  items-center h-8 w-32 mt-2
          rounded-full gap-4  bg-white  ${
            index === lastSelectedIndex ? "outline outline-blue-600" : ""
          }`}
      >
        {user.image && (
          <Image
            className="rounded-full h-5 w-5"
            src={user.image}
            height={5}
            width={5}
            alt="avatar"
          />
        )}
        {/* <img
          className="rounded-full w-3 h-3"
          src={user.avatar}
          alt="image description"
        ></img> */}
        <span className="text-xs">{user.name}</span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => handleToggle(user)}
          ></input>
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>

        <button className="pr-3 h-10 w-10" onClick={() => handleRemove(user)}>
          &#x2715;
        </button>
      </li>
    ))}
  </div>
);

export default UserList;

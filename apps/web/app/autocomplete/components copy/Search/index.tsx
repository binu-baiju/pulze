import React from "react";
import Image from "next/image";
import { User as UserType } from "../../../../types/index";

interface UserSearchProps {
  searchQuery: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isDropdownOpen: boolean;
  matchedUsers: UserType[];
  handleUserAction: (user: UserType, action: "add" | "remove") => void;
  setDropdownOpen: (value: boolean) => void;
  focusedUserIndex: number;
}

const UserSearch: React.FC<UserSearchProps> = ({
  searchQuery,
  handleInputChange,
  handleKeyDown,
  isDropdownOpen,
  matchedUsers,
  handleUserAction,
  setDropdownOpen,
  focusedUserIndex,
}) => (
  <div className="bg-red-500 w-full">
    <input
      className="outline outline-0 w-full"
      type="text"
      placeholder="Add new user..."
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onClick={() => setDropdownOpen(true)}
    />
    {isDropdownOpen && (
      <ul className="bg-white border rounded shadow-2xl max-h-80 overflow-auto absolute">
        {matchedUsers.map((user, index) => (
          <li
            key={user.id}
            className={`px-6 font-sans text-sm py-2 cursor-pointer transition duration-300 hover:bg-gray-200 flex items-center space-x-4 ${
              focusedUserIndex === index ? "bg-gray-200" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleUserAction(user, "add");
            }}
          >
            <Image
              src={user.avatar}
              height={50}
              width={50}
              className="rounded-full"
              alt="avatar"
            />
            <div className="flex justify-content-between items-start">
              <p className="pl-2 px-2">{user.name}</p>
              <p className="text-gray-500 px-2">{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default UserSearch;

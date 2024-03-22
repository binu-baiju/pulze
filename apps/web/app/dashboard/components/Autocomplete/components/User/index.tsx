"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User as UserType } from "../../../../../../types/index";
import { StarHalf } from "lucide-react";
import { useSession } from "next-auth/react";

interface UserListProps {
  users: UserType[];
  handleRemove: (user: UserType) => void;
  lastSelectedIndex: number | null;
  handleToggle: (user: UserType) => void;
}
// const insertLineBreak = (str: string, breakIndex: number): string => {
//   const chunks: string[] = [];
//   let i = 0;

//   while (i < str.length) {
//     chunks.push(str.substring(i, i + breakIndex));
//     i += breakIndex;
//   }

//   return chunks.join("\n");
// };
const insertLineBreak = (str, breakIndex) => {
  return str.substring(0, breakIndex) + "\n" + str.substring(breakIndex);
};
const UserList: React.FC<UserListProps> = ({
  users,
  handleRemove,
  lastSelectedIndex,
  handleToggle,
}) => {
  const { data: session, status } = useSession();

  // const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  // console.log("Users in autocomplete", users);

  const userId = session?.user.id;
  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 px-1 bg-red-500 py-2  ${users.length > 2 ? "max-h-[120px] overflow-x-hidden  overflow-y-auto" : ""}`}
    >
      {users.map((user, index) => (
        <li
          key={user.id}
          className={`flex justify-between  items-center h-8
          rounded-full gap-1  bg-white  ${
            index === lastSelectedIndex ? "outline outline-blue-600" : ""
          } `}
        >
          {/* {user.image && ( */}
          <Image
            className="rounded-full h-5 w-5"
            src={user.image ? user.image : "/icons8-user-50.png"}
            height={5}
            width={5}
            alt="avatar"
          />
          {/* )} */}
          {/* <img
          className="rounded-full w-3 h-3"
          src={user.avatar}
          alt="image description"
        ></img> */}
          {/* <span className="text-xs">{user.name}</span>
           */}
          <span className="text-xs">
            {/* Check if the name has more than 4 letters */}
            {user.name.length > 4 ? insertLineBreak(user.name, 4) : user.name}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer "
              onChange={() => handleToggle(user)}
            ></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              {/* <StarHalf fill="yellow" strokeWidth={0} /> */}
            </div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
          </label>
          {/* <div className="relative inline-block align-middle select-none">
            <input
              type="checkbox"
              id="toggle-button"
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="toggle-button"
              className="toggle-button-cover block bg-gray-200 w-20 h-14 rounded-full cursor-pointer"
            >
              <span
                className={`button-cover block bg-white w-12 h-12 rounded-full ${
                  isChecked ? "translate-x-6" : "translate-x-0"
                } shadow-md transform transition-transform duration-300 ease-in-out`}
              ></span>
              <span
                className={`knobs block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex justify-center items-center ${
                  isChecked ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {isChecked ? (
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 11.8h17.8V24H0zM6.7 6.5h17.8v11.3H6.7z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 11.8h17.8V24H0z" />
                  </svg>
                )}
              </span>
            </label>
          </div> */}

          <button className="pr-3 h-10 w-10" onClick={() => handleRemove(user)}>
            &#x2715;
          </button>
        </li>
      ))}
    </div>
  );
};
export default UserList;

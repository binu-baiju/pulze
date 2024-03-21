import React from "react";
import Image from "next/image";
import { User as UserType } from "../../../../types/index";

interface UserListProps {
  users: UserType[];
  handleRemove: (user: UserType) => void;
  lastSelectedIndex: number | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  handleRemove,
  lastSelectedIndex,
}) => (
  <>
    {users.map((user, index) => (
      <li
        key={user.id}
        className={`flex items-center bg-gray-300 rounded-full gap-4 ${
          index === lastSelectedIndex ? "outline outline-blue-600" : ""
        }`}
      >
        <Image
          className="rounded-full h-8 w-8"
          src={user.avatar}
          height={10}
          width={10}
          alt="avatar"
        />
        <span>{user.name}</span>
        <button className="pr-3" onClick={() => handleRemove(user)}>
          &#x2715;
        </button>
      </li>
    ))}
  </>
);

export default UserList;

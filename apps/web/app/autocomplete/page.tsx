"use client";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { User as UserType } from "../../types/index";
import { userList } from "./components copy/data";
import Container from "./components copy/Container";
import UserSearch from "./components copy/Search";
import UserList from "./components copy/User";
// import { DatePickerWithPresets } from "ui/components/datepicker";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>(userList);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<UserType[]>(userList);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<null | number>(
    null
  );
  const [focusedUserIndex, setFocusedUserIndex] = useState(-1);

  useEffect(() => {
    setMatchedUsers(users);
  }, [users]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdownOpen(false);
    } else if (e.key === "Backspace") {
      setBackspaceCount((prevCount) => prevCount + 1);
      if ((backspaceCount + 1) % 2 === 0) {
        setSelectedUsers((prevUsers) => prevUsers.slice(0, -1));
      } else {
        setLastSelectedIndex(selectedUsers.length - 1);
      }
    } else if (isDropdownOpen) {
      if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        setFocusedUserIndex((prevIndex) => {
          let newIndex = prevIndex + (e.key === "ArrowDown" ? 1 : -1);

          // Circular navigation
          if (newIndex < 0) {
            newIndex = matchedUsers.length - 1;
          } else if (newIndex >= matchedUsers.length) {
            newIndex = 0;
          }

          // Single-item list
          if (matchedUsers.length === 1) {
            newIndex = 0;
          }

          return newIndex;
        });
      } else if (e.key === "Enter") {
        if (focusedUserIndex !== -1) {
          handleUserAction(matchedUsers[focusedUserIndex], "add");
        }
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setMatchedUsers(users);
    } else {
      const matched = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setMatchedUsers(matched);
    }
    setDropdownOpen(value.trim() !== "");
  };

  const handleUserAction = (user: UserType, action: "add" | "remove") => {
    if (action === "add") {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setMatchedUsers((prevMatchedUsers) =>
        prevMatchedUsers.filter((u) => u.id !== user.id)
      );
    } else {
      const updatedUserList = selectedUsers.filter((u) => u.id !== user.id);
      setUsers((prevState) => [...prevState, user]);
      setSelectedUsers(updatedUserList);
    }
    setSearchQuery("");
    setDropdownOpen(true);
  };

  const handleRemove = (removedUser: UserType) => {
    handleUserAction(removedUser, "remove");
  };

  return (
    <Container className="bg-red-500">
      {/* <h1 className="text-4xl font-bold text-blue-600">Pick Users</h1> */}
      <div className=" bg-yellow-500">
        <ul className="flex justify-between">
          <UserList
            users={selectedUsers}
            handleRemove={handleRemove}
            lastSelectedIndex={lastSelectedIndex}
          />

          <UserSearch
            searchQuery={searchQuery}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            isDropdownOpen={isDropdownOpen}
            matchedUsers={matchedUsers}
            handleUserAction={handleUserAction}
            setDropdownOpen={setDropdownOpen}
            focusedUserIndex={focusedUserIndex}
          />
          {/* <DatePickerWithPresets /> */}
        </ul>
      </div>
      {matchedUsers.length === 0 && (
        <div className="px-4 py-2 text-center text-gray-600">
          No matching users found.
        </div>
      )}
    </Container>
  );
}

"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { User as UserType } from "../../../../types";
import { userList } from "./components/data";
import Container from "./components/Container";
import UserSearch from "./components/Search";
import UserList from "./components/User";
// import { DatePickerWithPresets } from "ui/components/datepicker";
import { DateTimePicker } from "ui/components/date-time-picker/date-time-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/components/tabs";
import { Clock } from "lucide-react";
import { useSession } from "next-auth/react";

import Workspace from "../dashboard";
// import { Workspace } from "@prisma/client";
interface DateFieldState {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}
export interface AutoCompleteProps {
  // Add a prop for passing the selected users to the parent
  onSelectedUsersChange: (selectedUsers: UserType[]) => void;
  onStateChange: (state: any) => void;
  setDateFieldState: Dispatch<SetStateAction<DateFieldState | null>>;
  dateFieldState: DateFieldState | null;
  formattedHours: String;
  selectWorkspace;
}

export default function AutoComplete({
  onSelectedUsersChange,
  onStateChange,
  dateFieldState,
  setDateFieldState,
  formattedHours,
  selectWorkspace,
}: AutoCompleteProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>();
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [matchedUsers, setMatchedUsers] = useState<UserType[]>();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<null | number>(
    null
  );
  const [focusedUserIndex, setFocusedUserIndex] = useState(-1);
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  useEffect(() => {
    // Fetch initial users from the database when the component mounts
    fetchUsersFromDatabase();
  }, []);

  useEffect(() => {
    // Update matchedUsers when the users or searchQuery changes
    updateMatchedUsers();
  }, [searchQuery, users, selectedUsers]);

  const fetchUsersFromDatabase = async () => {
    try {
      const workspaceId = "1bd89f4c-36eb-4411-9232-acb129219e8f";
      const query = encodeURIComponent(searchQuery);
      const response = await fetch(
        `http://localhost:8080/api/videorecordercompleted/search?workspaceId=${selectWorkspace.workspace_id}&query=${query}&userIdToRemove=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("users in AutoComplete", data.suggestions);
        const users = data.suggestions;
        // const filteredUser = users.find((user) => user.id === userId);
        setUsers(data.suggestions);
        setMatchedUsers(data.suggestions);
      } else {
        console.error("Failed to fetch users from the database");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // const updateMatchedUsers = () => {
  //   if (searchQuery.trim() === "") {
  //     setMatchedUsers(users ?? []); // Nullish coalescing operator
  //   } else {
  //     const matched = (users ?? []).filter((user) =>
  //       user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     const filteredMatched = matched.filter(
  //       (user) =>
  // //        !selectedUsers.find((selectedUser) => user.id === selectedUser.id)
  //     );
  //     setMatchedUsers(filteredMatched);
  //   }
  //   setDropdownOpen(searchQuery.trim() !== "");
  // };
  const updateMatchedUsers = () => {
    console.log("searchQuery:", searchQuery);
    console.log("users:", users);
    console.log("selectedUsers:", selectedUsers);
    if (searchQuery.trim() === "") {
      setMatchedUsers(users ?? []);
    } else {
      const matched = (users ?? []).filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter out the selected users
      const filteredMatched = matched.filter(
        (user) =>
          !selectedUsers.find((selectedUser) => user.id === selectedUser.id)
      );

      setMatchedUsers(filteredMatched);
    }

    setDropdownOpen(searchQuery.trim() !== "");
  };

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
          if (matchedUsers && newIndex < 0) {
            newIndex = matchedUsers.length - 1;
          } else if (matchedUsers && newIndex >= matchedUsers.length) {
            newIndex = 0;
          }

          // Single-item list
          if (matchedUsers && matchedUsers.length === 1) {
            newIndex = 0;
          }

          return newIndex;
        });
      } else if (e.key === "Enter") {
        if (matchedUsers && focusedUserIndex !== -1) {
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
      setDropdownOpen(true);
    } else {
      const matched = (users ?? []).filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      const filteredMatched = matched.filter(
        (user) =>
          !selectedUsers.find((selectedUser) => user.id === selectedUser.id)
      );
      setMatchedUsers(filteredMatched);
    }
    setDropdownOpen(value.trim() !== "");
  };

  const handleUserAction = (user: UserType, action: "add" | "remove") => {
    console.log("Before Update - Matched Users:", matchedUsers);
    if (action === "add") {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);

      setUsers((prevUsers) =>
        (prevUsers ?? []).filter((u) => u.id !== user.id)
      );
      setMatchedUsers((prevMatchedUsers) =>
        (prevMatchedUsers ?? []).filter((u) => u.id !== user.id)
      );
      // onSelectedUsersChange(selectedUsers);
    } else {
      const updatedUserList = selectedUsers.filter((u) => u.id !== user.id);
      // setUsers((prevUsers) => [...(prevUsers ?? []), user]);
      setUsers((prevUsers) => {
        const updatedUsers = [...(prevUsers ?? []), user];
        console.log("Updated Users:", updatedUsers);
        return updatedUsers;
      });
      setSelectedUsers(updatedUserList);
      // setMatchedUsers((prevMatchedUsers) =>
      //   (prevMatchedUsers ?? []).filter((u) => u.id !== user.id)
      // );
      setMatchedUsers((prevMatchedUsers) => {
        const updatedMatchedUsers = (prevMatchedUsers ?? []).filter(
          (u) => u.id !== user.id
        );
        console.log("Updated Matched Users:", updatedMatchedUsers);
        return updatedMatchedUsers;
      });
      console.log("After Update - Matched Users:", matchedUsers);
      // onSelectedUsersChange(selectedUsers);
    }
    // onSelectedUsersChange(selectedUsers);
    setSearchQuery("");
    setDropdownOpen(false);
    setSelectedUsers((latestSelectedUsers) => {
      // Call the prop function with the updated selectedUsers
      onSelectedUsersChange(latestSelectedUsers);
      return latestSelectedUsers; // Return the updated state
    });
  };

  const handleRemove = (removedUser: UserType) => {
    // setMatchedUsers((prevMatchedUsers) => [
    //   ...(prevMatchedUsers ?? []),
    //   removedUser,
    // ]);
    handleUserAction(removedUser, "remove");
  };

  const handleToggle = (user: UserType) => {
    setUsers((prevUsers) => {
      if (!prevUsers) {
        console.error("Users are undefined");
        return prevUsers;
      }

      const updatedUserList = prevUsers.map((u) =>
        u.id === user.id ? { ...u, isToggleOn: !u.isToggleOn } : u
      );

      console.log("Updated users in handleToggle:", updatedUserList);

      return updatedUserList;
    });

    setMatchedUsers((prevMatchedUsers) => {
      if (!prevMatchedUsers) {
        console.error("Matched users are undefined");
        return prevMatchedUsers;
      }

      const updatedMatchedUsers = prevMatchedUsers.map((u) =>
        u.id === user.id ? { ...u, isToggleOn: !u.isToggleOn } : u
      );

      console.log(
        "Updated matched users in handleToggle:",
        updatedMatchedUsers
      );

      return updatedMatchedUsers;
    });

    setSelectedUsers((prevSelectedUsers) => {
      if (!prevSelectedUsers) {
        console.error("Selected users are undefined");
        return prevSelectedUsers;
      }

      const updatedSelectedUsers = prevSelectedUsers.map((u) =>
        u.id === user.id ? { ...u, isToggleOn: !u.isToggleOn } : u
      );

      console.log(
        "Updated selected users in handleToggle:",
        updatedSelectedUsers
      );

      // Pass the updated selected users to the parent component
      onSelectedUsersChange(updatedSelectedUsers);

      return updatedSelectedUsers;
    });
  };

  return (
    <Container className=" flex  justify-start  w-full">
      {/* <h1 className="text-4xl font-bold text-blue-600">Pick Users</h1> */}
      <div className=" w-full ">
        <div className="wrapper w-full justify-start  ">
          <ul className="flex     items-start w-full">
            <div className="flex  justify-start w-3/4 bg-gray-100 ">
              <b className="mt-2">To: </b>
              <div className="flex flex-col">
                {selectedUsers.length > 0 && (
                  <UserList
                    users={selectedUsers}
                    handleRemove={handleRemove}
                    lastSelectedIndex={lastSelectedIndex}
                    handleToggle={handleToggle}
                  />
                )}

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
              </div>
            </div>
            <div className="">
              {/* <DatePickerWithPresets /> */}
              {dateFieldState != null ? (
                <div
                  onClick={() => setDateFieldState(null)}
                  className="text-violet-600 flex justify-center  gap-1 cursor-pointer font-poppins font-light text-sm"
                >
                  <Clock size={18} className="mt-0.5" />
                  <p>Respond in {formattedHours}</p>
                </div>
              ) : (
                <DateTimePicker
                  granularity={"minute"}
                  onStateChange={onStateChange}
                  // setShowRespondByComponent={setShowRespondByComponent}
                />
              )}
            </div>
          </ul>
        </div>
        {(matchedUsers ?? []).length === 0 && (
          <div className="px-4 py-2 text-center text-gray-300">
            No matching users found.
          </div>
        )}
      </div>
    </Container>
  );
}

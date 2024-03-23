import { Button } from "ui/components/button";
import { BsPersonAdd } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "ui/components/dialog";
import { AvatarDemo } from "./avatar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  emailVerified: boolean;
  image: string;
}
export function Settings() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<User>();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    if (session && userId) {
      try {
        const userData = await fetch(
          `http://localhost:8080/api/get-user-info?user_id=${userId}`
        );
        const data = await userData.json();
        setUser(data?.userInfo);
        console.log("userInfo", data.userInfo);
        setUserName(data?.userInfo?.name);
      } catch (ex) {
        console.log("ex from user", ex);
        // alert("Error while fetching workspace");
      }
    }
  };

  const updateUserName = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/update-user-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            user_name: userName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        await fetchUserInfo();
        // console.log("SendVideo response:", data);
        toast("user name updated successfully");
      } else {
        console.error("Failed to update user name");
        const data = await response.json();
        console.error("Error response:", data.error);
        toast("error", data.error);
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating user name:", error);
      toast("error", error);
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[poppins] cursor-pointer font-light text-xs text-left justify-start items-center m-1 text-[#0F172A]">
          Settings
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-full flex flex-col justify-between items-start border border-slate-500">
        <DialogHeader>
          <DialogTitle className="flex font-[Inter] font-semibold justify-start text-lg">
            Profile
          </DialogTitle>
          <DialogDescription className="font-poppins font-medium text-xl text-center text-[#4B5563] py-4">
            <div className="flex flex-row items-center mt-10">
              <div className="scale-[5] ml-10">
                <AvatarDemo imageUrl={user?.image} />
              </div>
              <button className="flex flex-row items-center justify-center mx-12">
                <BsPersonAdd className="text-black text-3xl mx-2" />
                <span className="font-[poppins] text-sm font-normal text-black">
                  Upload profile photo
                </span>
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold font-[poppins]">Name</p>
            <input
              className="flex grow text-sm font-normal font-[poppins] border-2 ml-2 w-[600px] border-2"
              placeholder="Name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold font-[poppins]">Email</p>
            <input
              className="flex grow text-sm font-normal font-[poppins] border-2 ml-2 w-[600px] border-2"
              placeholder="email"
              type="email"
              disabled
              value={user?.email}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-8 justify-center items-center mb-44">
          <Button
            type="submit"
            className="bg-[#8645FF] hover:bg-[#8645FF] w-40 h-30 rounded-r-md font-[Inter] font-semibold text-lg"
            onClick={updateUserName}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

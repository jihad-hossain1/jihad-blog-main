"use client";

import MainContainer from "@/components/MainContainer";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <MainContainer>
      <div className="">
        <div className="relative bg-white shadow-[2px_5px_15px_rgba(0,0,0,0.25)] rounded-md p-4 ">
          <h4 className="uppercase">name: {session?.user?.name}</h4>
          <h4 className="uppercase">email: {session?.user?.email}</h4>
          <h4 className="uppercase ">
            user-role:
            <span className="text-green-600 underline">
              {session?.user?.role}
            </span>
          </h4>

          <div className="absolute top-0 right-0">
            <a href="/profile/my-blogs" className="btn text-xs">
              My Blogs{" "}
            </a>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default ProfilePage;

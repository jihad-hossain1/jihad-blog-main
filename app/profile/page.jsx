"use client";

import MainContainer from "@/components/MainContainer";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <MainContainer>
      <div className="flex justify-center items-center flex-col min-h-[70vh]">
        <div className="bg-white shadow-[2px_5px_15px_rgba(0,0,0,0.25)] rounded-md p-4 ">
          <h4 className="uppercase">name: {session?.user?.name}</h4>
          <h4 className="uppercase">email: {session?.user?.email}</h4>
          <h4 className="uppercase ">
            user-role:{" "}
            <span className="text-green-600 underline">
              {session?.user?.role}
            </span>
          </h4>
        </div>
      </div>
    </MainContainer>
  );
};

export default ProfilePage;

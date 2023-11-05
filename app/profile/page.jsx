"use client";

import MainContainer from "@/components/MainContainer";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <MainContainer>
      <div className="bg-green-100 shadow-xl p-4 w-fit flex flex-col items-center">
        <h4>name: {session?.user?.name}</h4>
        <h4>email: {session?.user?.email}</h4>
      </div>
    </MainContainer>
  );
};

export default ProfilePage;

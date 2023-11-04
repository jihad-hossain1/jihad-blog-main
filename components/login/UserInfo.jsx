"use client";

import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return <div>log out</div>;
  }
  return <div>UserInfo</div>;
};

export default UserInfo;

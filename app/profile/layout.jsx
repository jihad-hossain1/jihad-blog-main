"use client";
import UserAuth from "@/context/UserAuth";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <UserAuth>
      <div className="container mx-auto p-2 min-h-screen">{children}</div>
    </UserAuth>
  );
};

export default UserLayout;

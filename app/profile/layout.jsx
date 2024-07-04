"use client";
import UserAuth from "@/context/UserAuth";
import React from "react";

const UserLayout = ({ children }) => {
  return <UserAuth>{children}</UserAuth>;
};

export default UserLayout;

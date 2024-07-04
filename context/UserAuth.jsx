"use client";

import Loader from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserAuth = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <Loader />
      </div>
    );
  }

  return status === "authenticated" ? children : null;
};

export default UserAuth;

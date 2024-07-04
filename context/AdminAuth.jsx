"use client";

import Loader from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminAuth = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && data?.user?.role !== "admin") {
      router.push("/Denied");
    }
  }, [status, data, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-[90vh]">
        <Loader />
      </div>
    );
  }

  return status === "authenticated" && data?.user?.role === "admin"
    ? children
    : null;
};

export default AdminAuth;

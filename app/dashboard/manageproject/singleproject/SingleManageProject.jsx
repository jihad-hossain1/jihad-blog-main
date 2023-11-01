"use client";

import React from "react";
import { PiTrashSimpleLight, PiEyeLight } from "react-icons/pi";
import { VscEdit } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SingleManageProject = ({ item }) => {
  const router = useRouter();

  const handleDeleteItme = async (ite) => {
    const confirmed = confirm("are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/projects?id=${ite?._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  const handleUpdateItme = (ite) => {
    console.log(ite?._id);
  };

  return (
    <div className="bg-white p-4 rounded-sm shadow-sm">
      <h4 className="break-all text-sm text-blue-gray-400 mb-3">
        projectId: {item?._id}
      </h4>
      <h4 className="text-blue-gray-500 mb-3">{item?.title}</h4>

      <div className="flex items-center space-x-4 justify-end">
        <button onClick={() => handleDeleteItme(item)}>
          <PiTrashSimpleLight className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </button>
        <Link href={`/updateProject/${item?._id}`}>
          <VscEdit className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </Link>
        <button>
          <PiEyeLight className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
};

export default SingleManageProject;

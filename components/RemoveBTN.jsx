"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BsTrash } from "react-icons/bs";
// import {use}



const RemoveBTN = ({ topic }) => {
  const router = useRouter();
  //

  const removeTopic = async (t_id) => {
    console.log(t_id?._id);

    const confirmed = confirm("are you sure ?");
    // console.log(id);
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${t_id?._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <>
      <button onClick={() => removeTopic(topic)} className="text-red-500">
        <BsTrash size={25} />
      </button>
    </>
  );
};

export default RemoveBTN;

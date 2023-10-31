"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddTopic = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // console.log("object");

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("title and description are required");
      return;
    }
    const info = {
      title,
      description,
    };
    try {
      const res = await fetch(`/api/topics`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("failed to create topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h4 className="my-10 underline text-center text-xl font-semibold">
          Add topics
        </h4>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="border focus:outline-none p-3"
          placeholder="title"
          id=""
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          className="border focus:outline-none p-3"
          placeholder="description"
          id=""
        />
        <button
          type="submit"
          className="transition duration-300 border p-4 w-fit bg-green-600 text-white rounded hover:bg-green-500"
        >
          add topic
        </button>
      </form>
    </div>
  );
};

export default AddTopic;

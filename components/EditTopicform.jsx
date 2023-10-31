"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTopicform = ({ id, topic }) => {
  const router = useRouter();
  const { title, description } = topic;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const upInfo = {
      newTitle,
      newDescription,
    };
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(upInfo),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h4 className="my-10 underline text-center text-xl font-semibold">
            Edit topics
          </h4>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            name="title"
            className="border focus:outline-none p-3"
            placeholder="title"
            id=""
          />
          <input
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            type="text"
            name="description"
            className="border focus:outline-none p-3"
            placeholder="description"
            id=""
          />
          <button
            type="submit"
            className="transition duration-300 border p-4 w-fit bg-yellow-600 text-white rounded hover:bg-yellow-500"
          >
            update topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTopicform;

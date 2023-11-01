"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateProjectForm = ({ id, project }) => {
  const router = useRouter();

  const { title, livelink, gitlink } = project;

  const [newTitle, setNewTitle] = useState(title);
  const [newLivelink, setNewLivelink] = useState(livelink);
  const [newGitlink, setNewGitlink] = useState(gitlink);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const upInfo = {
      newTitle,
      newLivelink,
      newGitlink,
    };
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(upInfo),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4 className="text-xl font-bold text-center underline my-10">
        Update your Project
      </h4>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              className="w-full border border-gray-200 p-3 focus:outline-none"
              placeholder="Title"
              type="text"
              name="title"
            />
          </div>
          <div className="mb-6 flex space-x-3 items-center">
            <input
              onChange={(e) => setNewGitlink(e.target.value)}
              value={newGitlink}
              className="w-full border border-gray-200 p-3 focus:outline-none"
              placeholder="git-link"
              type="text"
              name="gitlink"
            />
            <input
              onChange={(e) => setNewLivelink(e.target.value)}
              value={newLivelink}
              className="w-full border border-gray-200 p-3 focus:outline-none"
              placeholder="live-link"
              type="text"
              name="livelink"
            />
          </div>
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

export default UpdateProjectForm;

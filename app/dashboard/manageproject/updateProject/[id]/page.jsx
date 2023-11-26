import React from "react";
import UpdateProjectForm from "./UpdateProjectForm";

const getProjectById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/projects/${id}`, {
      cache: "no-store",
    });
    //
    if (!res.ok) {
      throw new Error("failed to fetch project");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const UpdateProject = async ({ params }) => {
  const id = params;
  const { project } = await getProjectById(id);
  return (
    <div className="w-full h-full">
      <UpdateProjectForm id={id} project={project} />
    </div>
  );
};

export default UpdateProject;

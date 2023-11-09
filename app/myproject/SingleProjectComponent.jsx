import React from "react";

const SingleProjectComponent = ({ project }) => {
  return (
    <div className="p-5 flex  flex-col-reverse md:grid md:gap-4 md:grid-cols-2  ">
      <div>
        <h4 className="text-xl font-bold text-gray-800">{project?.title}</h4>
        <p>{project?.details}</p>
      </div>
      <img src={project?.image} alt="" />
    </div>
  );
};

export default SingleProjectComponent;

// import getProjects from "@/utils/getProjects";
import React from "react";
import SingleManageProject from "./singleproject/SingleManageProject";
import Link from "next/link";
import { fetchProjects } from "../../../utils/fetch/projects";

const ManageProjectsPage = async () => {
  const items = await fetchProjects();
  return (
    <div>
      <Link href={"/dashboard/addproject"}>
        <button>add project</button>
      </Link>
      <h4 className="text-xl font-bold text-center">
        Manage-project : {items?.projects?.length}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {items?.projects?.map((item) => (
          <SingleManageProject key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ManageProjectsPage;

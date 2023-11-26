import { borderColor, getColor } from "@/utils/getRandomColor";
import SingleProjectComponent from "./SingleProjectComponent";
const getProjects = async () => {
  try {
    // https://jihad-blog-main.vercel.app
    const res = await fetch("https://jihad-blog-main.vercel.app/api/projects", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fatch");
    }
    return res.json();
  } catch (error) {
    console.log("error loading projects:", error);
  }
};
const MyProjectPage = async () => {
  const { projects } = await getProjects();

  const uniqueCategories = [
    ...new Set(projects?.map(({ category }) => category)),
  ];

  const borderColor = (bg) => {
    let color = `border-gray-700`;

    switch (bg) {
      case "framework":
        color = `border-[#38b7ea]`;
        return color;
      case "css":
        color = `border-[#38b7ea]`;
        return color;
      case "javascript":
        color = ` border-[#ffc952]`;
        return color;
      case "react":
        color = `border-[#087ea4]`;
        return color;
      case "nodejs":
        color = `border-[#026e00]`;
        return color;
    }
    return color;
  };
  return (
    <div className="max-w-screen-xl mx-auto px-2 md:px-6  py-2 min-h-screen">
      <div className="flex justify-between items-center my-6">
        <h4 className="text-gray-500 text-2xl font-semibold">Portfolio</h4>
        <h4 className="text-gray-500">{`${projects?.length} Projects`}</h4>
      </div>
      <div className="">
        <div>
          {projects &&
            uniqueCategories?.map((uniqueProject, index) => (
              <div key={index} className="mb-5">
                <h4
                  className={`mb-3 uppercase font-bold border-b w-fit pb-1 ${borderColor(
                    uniqueCategories
                  )}`}
                >
                  {uniqueCategories}
                </h4>
                <div className="grid gap-6">
                  {projects
                    ?.filter((project) => project.category === uniqueProject)
                    .map((filteredProject, _index) => (
                      <SingleProjectComponent
                        key={_index}
                        project={filteredProject}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjectPage;

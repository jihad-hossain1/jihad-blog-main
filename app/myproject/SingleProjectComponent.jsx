import Link from "next/link";
import Screenshot from "./Screenshot";
import Image from "next/image";

const SingleProjectComponent = ({ project }) => {
  const getColor = (bg) => {
    let color = `bg-gray-100/10`;

    switch (bg.toLowerCase()) {
      case "frameworks":
        color = `bg-gray-100/10`;
        return color;
      case "css":
        color = `bg-[#38b7ea]`;
        return color;
      case "javascript":
        color = ` bg-[#ffc952]`;
        return color;
      case "react":
        color = `bg-[#087ea4]`;
        return color;
      case "nodejs":
        color = `bg-[#026e00]`;
        return color;
    }
    return color;
  };
  return (
    <div
      className={`p-2 md:p-5 flex gap-4 flex-col-reverse md:flex-row md:justify-between rounded-lg w-full shadow-[0px_0px_4px_rgba(0,0,0,0.25)] md:max-h-[430px]`}
    >
      <div className="md:w-[50%] flex flex-col justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <h4 className="text-2xl font-bold text-gray-800">
              {project?.title}
            </h4>
            <h4 className="text-gray-500">{project?.category}</h4>
          </div>
          <p className="text-lg font-serif break-all text-gray-600 ">
            {project?.details.slice(0, 650)}
          </p>
        </div>
        <div className="grid grid-cols-3 md:flex-row gap-2 md:gap-4 items-center">
          <Screenshot images={project?.images}>
            <button className="linkT border-gray-400">screenshot</button>
          </Screenshot>
          <Link
            target="_blank"
            className=" linkT border-gray-400 flex items-center justify-center"
            href={`${project?.livelink}`}
          >
            Live Link
          </Link>
          <Link
            target="_blank"
            className=" linkT border-gray-400 flex items-center justify-center"
            href={`${project?.gitlink}`}
          >
            Github Link
          </Link>
          <button className=" linkT border-gray-400 flex items-center justify-center">
            More
          </button>
        </div>
      </div>
      <div className="">
        <Image
          className="object-cover w-full h-full "
          height={400}
          width={400}
          src={project?.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default SingleProjectComponent;

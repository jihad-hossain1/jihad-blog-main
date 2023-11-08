"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiTrashSimpleLight, PiEyeLight } from "react-icons/pi";
import { VscEdit } from "react-icons/vsc";

const SingleBlog = ({ itm }) => {
  const router = useRouter();

  const handleDeleteItme = async (id) => {
    const confirmed = confirm("are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm">
      <h4 className="break-all text-sm text-blue-gray-400 mb-3">
        blogId: {itm?._id}
      </h4>
      <h4 className="text-blue-gray-500 mb-3">{itm?.articleTitle}</h4>

      <div className="flex itms-center space-x-4 justify-end">
        <button onClick={() => handleDeleteItme(itm?._id)}>
          <PiTrashSimpleLight className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </button>
        <Link href={`/updateBlog/${itm?._id}`}>
          <VscEdit className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </Link>
        <button>
          <PiEyeLight className="text-2xl text-blue-gray-400 hover:text-gray-900 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
};

export default SingleBlog;

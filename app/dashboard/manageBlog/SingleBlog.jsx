"use client";

import { useToast } from "@/components/ui/use-toast";
import { revalidate } from "@/helpers/revalidate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiTrashSimpleLight, PiEyeLight } from "react-icons/pi";
import { VscEdit } from "react-icons/vsc";

const SingleBlog = ({ itm }) => {
  const router = useRouter();
  const { toast } = useToast();


  return (
    <div className="bg-white p-4 rounded-sm shadow-sm">
      <h4 className="break-all text-sm text-blue-gray-400 mb-3">
        blogId: {itm?._id}
      </h4>
      <h4 className="text-blue-gray-500 mb-3">{itm?.articleTitle}</h4>

     
    </div>
  );
};

export default SingleBlog;

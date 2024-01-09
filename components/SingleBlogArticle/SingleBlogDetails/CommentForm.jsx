"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

const CommentForm = ({ bid }) => {
  const [isFormToggle, setisFormToggle] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const isEmail = session?.user.email;
  const isName = session?.user.name;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { details } = formData;
    const info = {
      details: details,
      name: isName,
      email: isEmail,
      blogId: bid,
    };

    if (!session) {
      return alert("login first");
    }
    try {
      const res = await fetch(`/api/blogCommets?blogId=${bid}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        router.refresh();
        toast.success("successfull added comment");
      } else {
        throw new Error("failed to create comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scafolding = {
    name: session?.user.name,
    details: "",
  };

  const [formData, setFormData] = useState(scafolding);

  useEffect(() => {
    const objectLength = formData?.details.length;
    // console.log(objectLength);
    objectLength == 0 ? "" : "";
  }, [formData]);

  return (
    <div className="p-4">
      {/* <Toaster /> */}

      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="">
            <Textarea
              className="p-3 focus:outline-none border border-zinc-200 rounded shadow min-h-[30px]"
              required
              placeholder="Type your comments here."
              type="text"
              name="details"
              id="details"
              maxLength={300}
              defaultValue={formData.details}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <button
              type="submit"
              className={
                formData?.details.length == 0 ? "hidden" : "block btn text-xs"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;

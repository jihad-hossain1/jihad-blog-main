"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      const res = await fetch(`/api/blogCommets`, {
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

  return (
    <div className="p-4">
      {/* <Toaster /> */}
      <button
        onClick={() => setisFormToggle((pre) => !pre)}
        className="transition-all duration-300 text-sm font-semibold bg-gray-200 px-4 py-1 rounded-md shadow hover:bg-slate-200/75"
      >
        {isFormToggle ? "Close Comment Box" : "Open Comment Box"}
      </button>
      {isFormToggle && (
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                className="p-3 focus:outline-none border border-zinc-200 rounded shadow"
                defaultValue={isName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="details" className="text-sm">
                Details
              </label>
              <textarea
                className="p-3 focus:outline-none border border-zinc-200 rounded shadow"
                required
                type="text"
                name="details"
                id="details"
                defaultValue={formData.details}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <button type="submit" className="btn text-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;

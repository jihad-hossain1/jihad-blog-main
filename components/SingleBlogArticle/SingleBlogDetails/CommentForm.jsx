"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CommentForm = ({ bid }) => {
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
    const { details } = formData;
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
        toast.success("successfull added comment");
        router.refresh();
      } else {
        throw new Error("failed to create comment");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(info);
  };

  const scafolding = {
    name: session?.user.name,
    details: "",
  };
  const [formData, setFormData] = useState(scafolding);

  return (
    <div className="p-4">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            defaultValue={isName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="details">details</label>
          <textarea
            required
            type="text"
            name="details"
            id="details"
            defaultValue={formData.details}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

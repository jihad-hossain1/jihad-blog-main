"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const CommentForm = ({ bid }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { details } = formData;
    const info = {
      details: details,
      name: isName,
      email: isEmail,
      blogId: bid,
    };

    console.log(info);
  };

  const scafolding = {
    name: session?.user.name,
    details: "",
  };
  const [formData, setFormData] = useState(scafolding);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
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

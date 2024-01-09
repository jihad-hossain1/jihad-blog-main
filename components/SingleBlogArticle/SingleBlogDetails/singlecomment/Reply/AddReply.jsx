"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AddReply = ({ bid, commentId }) => {
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
      commentId: commentId,
    };

    if (!session) {
      return alert("login first");
    }
    try {
      const res = await fetch(
        `/api/blogCommets/reply?blogId=${bid}&commentId=${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      if (res.ok) {
        router.refresh();
        toast.success("successfull added reply");
      } else {
        throw new Error("failed to create reply");
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
    objectLength == 0 ? "" : "";
  }, [formData]);

  return (
    <div className="p-4">
      {/* <Toaster /> */}

      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="max-w-2xl flex gap-2">
            {session && (
              <div className="w-fit">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            )}
            <Textarea
              className="p-3 focus:outline-none border border-zinc-200 rounded shadow min-h-[30px]"
              required
              placeholder="Type your reply here."
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
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReply;

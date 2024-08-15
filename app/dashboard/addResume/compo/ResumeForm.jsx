"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ResumeForm = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const link = form.link.value;
    const info = {
      link,
    };
    try {
      const res = await fetch(`/api/resume`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        toast.success("successfull added link");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("failed to create link");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="max-w-lg mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="link">Pdf File</label>
          <input type="text" name="link" className="inpt" />
          <div>
            <button type="submit" className="btn">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;

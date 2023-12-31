"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddProductForm = () => {
  const router = useRouter();
  
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("successfull added product");
        // router.push("/");
        router.refresh();
      } else {
        throw new Error("failed to create product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const scafolding = {
    title: "",
    details: "",
    category: "",
  };
  const [formData, setFormData] = useState(scafolding);
  return (
    <div className="max-w-[400px] lg:max-w-[500px] my-10 mx-auto">
      <Toaster />
      <h4 className="my-8 text-center text-xl font-semibold underline">
        AddProductForm
      </h4>
      <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
        <input
          onChange={handleChange}
          value={formData.title}
          type="text"
          name="title"
          className="border focus:outline-none p-3"
          placeholder="title"
          id=""
        />
        <textarea
          onChange={handleChange}
          value={formData.details}
          type="text"
          name="details"
          className="border focus:outline-none p-3"
          placeholder="details"
          id=""
        />
        <select
          onChange={handleChange}
          value={formData.category}
          name="category"
          className="border focus:outline-none p-3"
          id="category"
        >
          <option value="Template">Template</option>
          <option value="CMS">CMS</option>
          <option value="eCommerce">eCommerce</option>
          <option value="Others">Others</option>
        </select>
        <button
          type="submit"
          className="transition duration-300 border p-4 w-fit bg-green-600 text-white rounded hover:bg-green-500"
        >
          add product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

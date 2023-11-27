"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const UpdateProductForm = ({ pid, product }) => {
  const route = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const category = form.category.value;

    const info = {
      title,
      details,
      category,
    };

    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        body: JSON.stringify(info),
        "Content-type": "application/json",
      });
      if (!res.ok) {
        toast.error("update error occurs");
      }

      toast.success("update successfull");
      setTimeout(() => {
        route.refresh();
        route.push("/products");
      }, 1500);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto  px-4">
      <Toaster />
      <h4 className="text-center text-xl font-semibold py-10">
        UpdateProductForm
      </h4>
      <div className="max-w-[400px] lg:max-w-[500px] my-10 mx-auto">
        <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
          <input
            defaultValue={product?.title}
            type="text"
            name="title"
            className="border focus:outline-none p-3"
            placeholder="title"
            id=""
          />
          <input
            defaultValue={product?.details}
            type="text"
            name="details"
            className="border focus:outline-none p-3"
            placeholder="details"
            id=""
          />
          <select
            // onChange={handleChange}
            defaultValue={product?.category}
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
            className="transition duration-300 border p-4 w-fit bg-green-700 text-white rounded hover:bg-green-500"
          >
            update product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;

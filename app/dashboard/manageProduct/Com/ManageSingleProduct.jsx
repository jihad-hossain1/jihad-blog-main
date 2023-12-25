import DeleteProductButton from "@/app/products/compo/DeleteProductButton";
import Link from "next/link";
import React from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";

export const ManageSingleProduct = ({ product }) => {
  const { _id, title, category } = product;
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold">{title}</h4>
        <button className=" w-fit px-4 rounded text-sm bg-orange-200">
          {category}
        </button>
      </div>
      <div className="flex justify-end">
        <div className={`flex gap-4 items-center`}>
          <Link href={`/products/${_id}`}>
            <FaEye />
          </Link>
          <Link href={`/updateProduct/${_id}`}>
            <FaPencilAlt />
          </Link>
          <DeleteProductButton pid={_id} />
        </div>
      </div>
    </div>
  );
};

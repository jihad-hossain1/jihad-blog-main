"use client";

import Link from "next/link";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import DeleteProductButton from "./DeleteProductButton";

const SingleProduct = ({ _id, title, details }) => {
  return (
    <div className="rounded shadow-md bg-slate-50 p-5">
      <h4>{title}</h4>
      <h4>{_id}</h4>

      <div className="flex gap-4 items-center">
        <Link href={`/products/${_id}`}>
          <FaEye />
        </Link>
        <Link href={`/updateProduct/${_id}`}>
          <FaPencilAlt />
        </Link>
        <DeleteProductButton pid={_id} />
      </div>
    </div>
  );
};

export default SingleProduct;

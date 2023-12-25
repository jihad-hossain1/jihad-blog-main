"use client";

import Link from "next/link";
import { FaEye, FaPencilAlt } from "react-icons/fa";



const SingleProduct = ({ product }) => {
  const { _id, title, details, category } = product;

  return (
    <div className="rounded shadow-md bg-slate-50 p-5">
      <h4>{title}</h4>
      <p className="overflow-hidden break-all">{details}</p>
      <h4>{category}</h4>
    </div>
  );
};

export default SingleProduct;

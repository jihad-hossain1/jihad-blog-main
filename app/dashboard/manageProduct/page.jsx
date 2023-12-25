import Link from "next/link";
import React from "react";
import { getProducts } from "@/utils/fetchAllProducts";
import { ManageSingleProduct } from "./Com/ManageSingleProduct";

const ManageProduct = async () => {
  const _p = await getProducts();

  return (
    <main>
      <div>
        <Link className="" href={"/dashboard/addProduct"}>
          add product
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {_p?.products?.map((product) => (
          <ManageSingleProduct key={product?._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ManageProduct;

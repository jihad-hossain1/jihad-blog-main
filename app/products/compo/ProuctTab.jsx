"use client";

import { useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import SingleProduct from "./SingleProduct";
import { list } from "postcss";

const ProuctTab = ({ products }) => {
  console.log(products);
  const [filt, setFilt] = useState([]);
  const uniqueCategories = [
    ...new Set(products?.map(({ category }) => category)),
  ];
  console.log(uniqueCategories);
  const handleCategoryTab = (pcat) => {
    const fil = products?.filter(({ category }) => category === pcat);
    setFilt(fil);
  };
  return (
    <>
      <div>{filt?.length}</div>
      {/* <div className="flex items-center gap-5 bg-gray-400/30 p-4">
        {uniqueCategories.map((cat, index) => (
          <>
            <button onClick={() => handleCategoryTab(cat)} key={index}>
              {cat}
            </button>
            {filt?.map((product) => (
              <SingleProduct product={product} key={product?._id} />
            ))}
          </>
        ))}
      </div> */}
      {/* <div className="flex items-center gap-5 bg-gray-400/30 p-4">
        {uniqueCategories.map((cat, index) => (
          <button onClick={() => handleCategoryTab(cat)} key={index}>
            {cat}
          </button>
        ))}
      </div> */}
      <div className="">
        <Tab.Group>
          <Tab.List>
            {uniqueCategories?.map((cat, index) => (
              <Tab as={Fragment} key={index}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={
                      selected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }
                  >
                    {cat}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {products
              ?.filter((pro) => pro?.category === "CMS")
              .map((product) => (
                <Tab.Panel key={product?._id}>
                  <SingleProduct product={product} key={product?._id} />
                </Tab.Panel>
              ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProuctTab;

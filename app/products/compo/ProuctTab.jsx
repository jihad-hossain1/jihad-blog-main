"use client";

import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import SingleProduct from "./SingleProduct";

const ProuctTab = ({ products }) => {
  const eCommerce = products?.filter((item) => item?.category == "eCommerce");
  const Template = products?.filter((item) => item?.category == "Template");
  const CMS = products?.filter((item) => item?.category == "CMS");
  const Others = products?.filter((item) => item?.category == "Others");

  return (
    <>
      <div className="">
        <Tab.Group>
          <Tab.List
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "bg-blue-500/25 border-b border-orange-300 transition-all duration-500"
                      : ""
                  } bg-none px-4 rounded shadow-sm mb-4`}
                >
                  {`CMS`}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "bg-blue-500/25 border-b border-orange-300 transition-all duration-500"
                      : ""
                  } bg-none px-4 rounded shadow-sm mb-4`}
                >
                  {`eCommerce`}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "bg-blue-500/25 border-b border-orange-300 transition-all duration-500"
                      : ""
                  } bg-none px-4 rounded shadow-sm mb-4`}
                >
                  {`Others`}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "bg-blue-500/25 border-b border-orange-300 transition-all duration-500"
                      : ""
                  } bg-none px-4 rounded shadow-sm mb-4`}
                >
                  {`Template`}
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            {CMS?.map((product) => (
              <Tab.Panel key={product?._id}>
                <SingleProduct product={product} key={product?._id} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
          <Tab.Panels>
            {eCommerce?.map((product) => (
              <Tab.Panel key={product?._id}>
                <SingleProduct product={product} key={product?._id} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
          <Tab.Panels>
            {Others?.map((product) => (
              <Tab.Panel key={product?._id}>
                <SingleProduct product={product} key={product?._id} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
          <Tab.Panels>
            {Template?.map((product) => (
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

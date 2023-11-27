"use client";

import { useState } from "react";

const ProuctTab = ({ products }) => {
  const [filt, setFilt] = useState([]);
  const uniqueCategories = [
    ...new Set(products?.map(({ category }) => category)),
  ];
  const handleCategoryTab = (pcat) => {
    const fil = products?.filter(({ category }) => category === pcat);
    setFilt(fil);
  };
  return (
    <>
      <div>{filt?.length}</div>
      <div className="flex items-center gap-5 bg-gray-400/30 p-4">
        {uniqueCategories.map((cat, index) => (
          <button onClick={() => handleCategoryTab(cat)} key={index}>
            {cat}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProuctTab;

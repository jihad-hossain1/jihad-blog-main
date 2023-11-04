import React from "react";

const DetailsBlog = ({ details, detail }) => {
  return (
    <div>
      <p className="text-lg text-gray-500 break-all mb-4">
        {details?.detailsSingle || detail}
      </p>
      {details?.mores.length > 0
        ? details?.mores?.map((itm, i) => (
            <p className="break-all mb-3 text-lg text-gray-500" key={i}>
              {itm}
            </p>
          ))
        : null}
    </div>
  );
};

export default DetailsBlog;

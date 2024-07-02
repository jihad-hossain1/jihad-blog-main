"use client";
import Image from "next/image";
import React, { useRef } from "react";

const Screenshot = ({ children, images }) => {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.showModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };
  return (
    <>
      <span onClick={() => openModal()}>{children}</span>

      <dialog
        ref={modalRef}
        className=" w-fit rounded-md px-3 pt-2 pb-5 transition duration-300"
      >
        <div>
          <div className="text-right mb-2">
            <button
              onClick={() => {
                closeModal();
              }}
              className="hover:text-pink-600 p-2"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col overflow-y-scroll  gap-3 justify-center items-center">
            {images ? (
              images.map((itm, index) => (
                <div key={index}>
                  <Image
                    height={100}
                    width={100}
                    src={itm?.secure_urls}
                    className="rounded-xl border border-gray-200 p-1"
                    alt=""
                  />
                </div>
              ))
            ) : (
              <>no screenshot here..</>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Screenshot;

"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsGithub, BsFacebook } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { PiBookOpenThin, PiTelegramLogoLight } from "react-icons/pi";

const CV = ({ lastElem }) => {
  const modalRef = useRef(null);
  const formRef = useRef(null);
  const [updateData, setUpdateData] = useState(null);

  const openModal = (modalComp) => {
    setUpdateData(modalComp);
    modalRef.current.showModal();
  };
  const closeModal = () => {
    modalRef.current.close();
  };
  const handleMessage = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const subject = form.subject.value;
    const email = form.email.value;
    const message = form.message.value;
    // const info = {
    //   name,
    //   email,
    //   message,
    // };
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: email,
          to: "lovedose4166@gmail.com",
          subject: `${subject} - [${name}]`,
          html: "<p>HI</p>",
          text: message,
        }),
      });
      const data = await res.json();
      toast.success("Message sending successfull");
      form.reset();
      setTimeout(() => {
        closeModal();
      }, 2000);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="p-4  flex flex-col justify-center items-center">
        <div className="mb-3 rounded-full border-[1px] border-gray-100 inline-block  overflow-hidden mt-4">
          <img
            className="w-24 object-cover  "
            src="https://i.ibb.co/FnfTKzv/icon-Jihad.png"
            alt=""
          />
        </div>
        <h4 className="text-gray-600  mb-2">Jihad Hossain</h4>
        <h4 className="text-gray-600 mb-4">Front-End Developer</h4>
        <div className="flex space-x-3 ">
          <Link target="_blank" href={`https://github.com/jihad-hossain1`}>
            <BsGithub className="text-gray-500 hover:text-gray-900 text-2xl cursor-pointer transition-all duration-500" />
          </Link>
          <Link
            target="_blank"
            href={`https://linkedin.com/in/jihad-hossain-175571162/`}
          >
            <GrLinkedinOption className="text-gray-500 hover:text-gray-900 text-2xl transition-all duration-500 cursor-pointer" />
          </Link>
          <Link href={`#`}>
            <BsFacebook className="text-gray-500 hover:text-gray-900 text-2xl cursor-pointer transition-all duration-500" />
          </Link>
        </div>
      </div>

      <div>
        <a
          download="downloadMyCv"
          href={lastElem}
          target="_blank"
          className="w-full hover:bg-gray-50/60 hover:text-gray-900 border-y cursor-pointer transition-all duration-300 flex space-x-4 items-center px-6 md:px-8 py-6 text-gray-500"
        >
          <PiBookOpenThin className="text-2xl" /> <h4>Download my CV</h4>
        </a>
        <button
          onClick={() => openModal()}
          className="w-full hover:bg-gray-50/60 hover:text-gray-900 cursor-pointer transition-all duration-300 flex space-x-4 items-center px-6 md:px-8 py-6 text-gray-500"
        >
          <PiTelegramLogoLight className="text-2xl" />{" "}
          <span>Write message</span>
        </button>
      </div>
      {/* dialog component  */}
      <dialog
        ref={modalRef}
        className="w-[90%] max-w-[500px] rounded-md px-3 pt-2 pb-5"
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
          <form ref={formRef} action="" onSubmit={handleMessage}>
            <h4 className="text-2xl font-semibold text-center text-gray-700 mb-5">
              Write a Message
            </h4>
            <div className="mb-4">
              <input
                required
                type="text"
                className="inpt"
                name="name"
                placeholder="Your Name"
                // defaultValue={updateData?.commentUser}
              />
            </div>
            <div className="mb-4">
              <input
                required
                type="text"
                className="inpt"
                name="subject"
                placeholder="subject"
                // defaultValue={updateData?.commentUser}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                required
                className="inpt"
                name="email"
                placeholder="Your Email"
                // defaultValue={updateData?.commentUser}
              />
            </div>
            <div className="mb-4">
              <textarea
                maxLength={500}
                type="text"
                className="inpt"
                name="message"
                placeholder="Your Message"
              />
            </div>
            <div>
              <button className="inpt btn" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CV;

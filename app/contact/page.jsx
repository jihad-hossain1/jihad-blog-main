"use client";

import React from "react";
// import { IoLocationOutline } from "react-icons/io5";
import { PiPhonePlusThin } from "react-icons/pi";
import { CiMail, CiLocationOn } from "react-icons/ci";
// import { Button, Input, Textarea } from "@material-tailwind/react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const question = form.question.value;

    const info = {
      name,
      email,
      question,
    };

    if (info) {
      toast.success("tHank you for contact us");
      form.reset();
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-2 min-h-screen">
      <div className="bg-white p-4 md:p-10 rounded-sm shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* contact me  */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-gray-900">Contact me</h4>
            <div className="flex flex-col space-y-8">
              <div className="flex space-x-5">
                <CiMail className="text-3xl" />
                <div>
                  <h4 className="text-gray-900 mb-2">Jihadkhan934@gmail.com</h4>
                  <p className="text-sm text-gray-400">email</p>
                </div>
              </div>
              <div className="flex space-x-5">
                <PiPhonePlusThin className="text-3xl" />
                <div>
                  <h4 className="text-gray-900 mb-2">+880 1779334696</h4>
                  <p className="text-sm text-gray-400">phone</p>
                </div>
              </div>
              <div className="flex space-x-5">
                <CiLocationOn className="text-3xl" />
                <div>
                  <h4 className="text-gray-900 mb-2">Bogura, Bangladesh</h4>
                  <p className="text-sm text-gray-400">address</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-8 text-xl font-bold text-gray-900">
              Get in touch
            </h4>
            <h4 className="text-sm text-gray-400 ">
              Dont be say to ask me a questions.
            </h4>
            <div className="mt-10">
              <form action="" onSubmit={handleSubmit}>
                <div className=" flex space-x-2">
                  <input
                    className="w-full p-4 border border-gray-200 focus:outline-none"
                    placeholder="Name"
                    name="name"
                    type="text"
                    required
                  />
                  <input
                    className="w-full p-4 border border-gray-200 focus:outline-none"
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="mt-6">
                  <textarea
                    placeholder="Question"
                    maxLength={400}
                    className="w-full p-4 border border-gray-200 focus:outline-none"
                    name="question"
                    type="text"
                    required
                  />
                </div>
                <div className="mt-6">
                  <button
                    className="px-8 py-3 hover:bg-slate-100 border border-gray-200 w-fit "
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-2  rounded-sm shadow-sm mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d28938.390317003148!2d89.38575645653891!3d24.95594698063119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU4JzE4LjIiTiA4OcKwMjInMzEuNiJF!5e0!3m2!1sen!2sbd!4v1698595124485!5m2!1sen!2sbd"
          className="w-full h-[600px]"
          // style="border"

          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;

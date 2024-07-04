"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import loginSVG from "@/public/assests/login.svg";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const router = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrors("all fields are needed .");
      return;
    }
    try {
      // send to data in database ...
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const _res = await res.json();

      console.log(_res);
      if (!res.ok) {
        setErrors(_res?.error);
      }
      const form = e.target;
      form.reset();
      router.push("/login");
    } catch (error) {
      console.log("error from form section", error);
    }
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  const handleBack = () => {
    router.back();
  };

  return (
    <main className=" grid grid-cols-2 max-sm:grid-cols-1 border border-gray-300 rounded-md  shadow-xl">
      <div className="bg-gray-500 rounded-l-md flex justify-center items-center max-sm:hidden">
        <Image
          src={loginSVG}
          alt="login"
          width={300}
          height={300}
          className="h-[500px] w-[500px] max-sm:h-[300px] max-sm:w-[300px]"
        />
      </div>
      <div className="p-5 flex justify-center items-center relative max-sm:py-10">
        <div className="absolute top-10 max-sm:top-3 left-1/2 -translate-x-1/2">
          <h4 className="font-bold text-3xl max-sm:text-2xl text-center">
            Register.
          </h4>
        </div>
        <div>
          <form onSubmit={handlesubmit} className="flex flex-col gap-3">
            <div>
              <label htmlFor="">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="text"
                className="inpt"
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="inpt"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="inpt"
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white first-letter:uppercase rounded-md shadow-sm hover:shadow-md transition-all duration-300"
              >
                Register
              </button>
            </div>
          </form>
          {errors && <p className="text-red-600">{errors}</p>}
          <div className="flex items-center gap-2 mt-5">
            You have an already account ?
            <Link href={"/login"} className="underline text-blue-500">
              login here
            </Link>
          </div>
        </div>
        <div className="absolute top-0 max-sm:bottom-0 right-0">
          <button
            onClick={handleBack}
            className="w-fit px-4 text-sm py-1 bg-gray-800 hover:bg-gray-900 text-white first-letter:uppercase rounded shadow-sm hover:shadow-md transition-all duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;

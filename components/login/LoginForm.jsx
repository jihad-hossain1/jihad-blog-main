"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import loginSVG from "@/public/assests/login.svg";
import Image from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const router = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors("All fields are Required .");
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setErrors(res.error);
        return;
      }
      router.back();
    } catch (error) {
      console.error("🚀 ~ handlesubmit ~ error:", error);
    }
  };

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
            Login.
          </h4>
        </div>
        <div>
          <form onSubmit={handlesubmit} className="flex flex-col gap-3">
            {errors == "All fields are Required ." && (
              <p className="text-red-600">{errors}</p>
            )}
            <div>
              <label htmlFor="">Email</label>
              <input
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className="inpt"
              />
              {errors === "Email is not valid" && (
                <p className="text-red-600">{errors}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="inpt"
              />
              {errors === "Password Invalid" && (
                <p className="text-red-600">{errors}</p>
              )}

              <div className="mt-3">
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white first-letter:uppercase rounded-md shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <div className="flex md:justify-between md:items-center max-sm:flex-col ">
            <h4 className="flex items-center gap-2 mt-5">
              You are new here ?
              <a href={"/register"} className="underline text-blue-500">
                Register
              </a>
            </h4>
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

export default LoginForm;

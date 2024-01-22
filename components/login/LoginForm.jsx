"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const router = useRouter();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setErrors("invalid credentials");
        return;
      }
      router.push("/");
      // router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-2">
      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <label htmlFor="">Email</label>
        <input
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="inpt"
        />
        <label htmlFor="">Password</label>
        <input
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="inpt"
        />
        <input type="submit" value={"Login"} className="inpt btn" />
      </form>
      {errors && <p className="text-red-600">{errors}</p>}
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2 mt-5">
          You are new here ?
          <Link href={"/register"} className="underline">
            Register
          </Link>
        </div>
        <div className="mt-5">
          <button
            className="transition-all duration-700 bg-green-600 text-zinc-50 px-4 rounded py-1 hover:bg-green-600/75"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Use Guest Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

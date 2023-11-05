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
      <h4>LoginForm</h4>
      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <label htmlFor="">email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="inpt"
        />
        <label htmlFor="">password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="inpt"
        />
        <input type="submit" value={"login"} className="inpt btn" />
      </form>
      {errors && <p className="text-red-600">{errors}</p>}
      <div className="mt-2">
        <Link href={"/register"} className="underline">
          register here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

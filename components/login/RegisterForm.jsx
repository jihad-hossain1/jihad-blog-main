"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <div className="max-w-xl mx-auto p-2 min-h-screen pt-12">
      <h4 className="text-xl font-semibold text-center">Register Form</h4>

      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <label htmlFor="">Full Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="text"
          className="inpt"
        />
        <label htmlFor="">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          className="inpt"
        />
        <label htmlFor="">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="inpt"
        />
        <input type="submit" value={"register"} className="inpt btn" />
      </form>
      {errors && <p className="text-red-600">{errors}</p>}
      <div className="flex items-center gap-2 mt-5">
        You have an already account ?
        <Link href={"/login"} className="underline">
          login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

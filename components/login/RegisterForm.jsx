"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      // if already a user exist in database
      const userAlreadyExist = await fetch(`/api/userExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await userAlreadyExist.json();
      if (user) {
        setErrors("User already exists.");
        return;
      }
      // send to data in database ...
      const res = await fetch(`/api/register`, {
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

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
      }
    } catch (error) {
      console.log("error from form section", error);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-2">
      <h4 className="text-xl font-semibold text-center">Register Form</h4>

      <form onSubmit={handlesubmit} className="flex flex-col gap-3">
        <label htmlFor="">full name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="text"
          className="inpt"
        />
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
        <input type="submit" value={"register"} className="inpt btn" />
      </form>
      {errors && <p className="text-red-600">{errors}</p>}
      <div className="mt-2">
        <Link href={"/login"} className="underline">
          go login page
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import LoginForm from "./LoginForm";
import GoogleIcon from "./GoogleIcon";

const SignIn = () => {
  const { status, data: session } = useSession();
  return (
    <div className="max-w-screen-xl mx-auto px-8 min-h-screen pt-12">
      <h4 className="text-xl font-semibold text-center">Login Form</h4>
      <div>
        {status === "authenticated" ? (
          <>
            <div className="shadow-lg p-5 rounded-md flex flex-col gap-3 bg-orange-100 w-fit">
              <h4>user info: </h4>
              <Image
                alt="user photo"
                src={session?.user?.image}
                height={60}
                width={60}
              />
              <h4 className="text-xl font-semibold">{session?.user?.name}</h4>
              <h4>{session?.user?.email}</h4>
            </div>
          </>
        ) : (
          <div className="pt-16">
            <div className="flex justify-center">
              <button
                onClick={() => signIn("google")}
                className="text-xl font-bold text-gray-700 border border-blue-600 py-2 transition-all duration-700 rounded-lg px-6"
              >
                <GoogleIcon />
              </button>
            </div>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;

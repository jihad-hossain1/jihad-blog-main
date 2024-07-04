import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div className="p-20 max-sm:p-2 min-h-screen flex flex-col justify-center container mx-auto ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import RegisterForm from "@/components/login/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

import SignIn from "@/components/login/SignIn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default LoginPage;

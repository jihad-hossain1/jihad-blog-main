import { decode } from "next-auth/jwt";

import { cookies } from "next/headers";

export async function getCookieData() {
  const cookie = cookies().get("next-auth.session-token");
  // const cookie = request.cookies.get("next-auth.session-token");

  const decoded = await decode({
    token: cookie?.value,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(decoded);
    }, 1000)
  );
}

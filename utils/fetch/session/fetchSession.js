import { decode } from "next-auth/jwt";

export async function getCookieData(request) {
  const cookie = request.cookies.get("next-auth.session-token");

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

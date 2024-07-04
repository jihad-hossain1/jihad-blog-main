// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   async function middleware(req) {

//     if (
//       req.nextUrl.pathname.startsWith("/dashboard") &&
//       req.nextauth.token.role != "admin"
//     ) {
//       return NextResponse.rewrite(new URL("/denied", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// export const config = { matcher: ["/dashboard/:path*"] };

import { NextResponse } from "next/server";
import { getCookieData } from "./utils/fetch/session/fetchSession";
import { includes } from "@/helpers/includes";

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/dashboard");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/profile");
};

export async function middleware(req) {
  const sessionData = await getCookieData();
  const role = await sessionData?.role;

  const { pathname } = req.nextUrl;

  if (isUserRoute(pathname) && !includes(["user", "admin"], role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/denied", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/profile"] };

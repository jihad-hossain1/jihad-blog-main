import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
import { includes } from "lodash";
import { getCookieData } from "./utils/fetch/session/fetchSession";

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/dashboard");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/profile");
};

export async function middleware(req) {
  const sessionData = await getCookieData(req);
  const role = sessionData?.role;
  console.log("🚀 ~ middleware ~ role:", role);
  const { pathname } = req.nextUrl;

  if (isUserRoute(pathname) && !includes(["user", "admin"], role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/denied", req.url));
  }

  return NextResponse.next();
}
// export async function middleware(request) {
//   const sessionData = await getCookieData(request);
//   const loginUrl = new URL("/login", request.url);
//   const deniedUrl = new URL("/denied", request.url);

//   if (sessionData?.role !== "admin") {
//     return NextResponse.redirect(deniedUrl);
//   }
//   if (request.nextUrl.pathname.startsWith("/profile") && sessionData === null) {
//     return NextResponse.redirect(loginUrl);
//   }
//   return NextResponse.next();
// }

export const config = { matcher: ["/dashboard/:path*", "/profile"] };

// export default withAuth(
//   async function middleware(req) {
//     console.log(req);
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

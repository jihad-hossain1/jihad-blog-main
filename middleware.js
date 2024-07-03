import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
import { getCookieData } from "./utils/fetch/session/fetchSession";


export const config = { matcher: ["/dashboard/:path*", "/profile"] };


export async function middleware(request) {
  const sessionData = await getCookieData(request);
  const loginUrl = new URL("/login", request.url);
  const deniedUrl = new URL("/denied", request.url);

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    sessionData?.role !== "admin"
  ) {
    return NextResponse.redirect(deniedUrl);
  }
  if (request.nextUrl.pathname.startsWith("/profile") && sessionData === null) {
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
  
}


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

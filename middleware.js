import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
import { getCookieData } from "./utils/fetch/session/fetchSession";


export const config = { matcher: ["/dashboard/:path*", "/profile"] };


export async function middleware(request) {
  const sessionData = await getCookieData(request);

  if (sessionData?.role == "admin") {
    return NextResponse.next();
  }
  const loginUrl = new URL("/denied", request.url);
  return NextResponse.redirect(loginUrl);
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

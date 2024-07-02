import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";


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

export const config = { matcher: ["/dashboard/:path*", "/profile"] };

// import { serverAuth } from "./lib/session";



export async function middleware(request) {
  // const authUser = await serverAuth();
  const isT = true;

  if (isT) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/denied", request.url);
  return NextResponse.redirect(loginUrl);
}

import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// import { serverAuth } from "./lib/session";

export const config = { matcher: ["/dashboard/:path*", "/profile"] };

// export async function middleware(request) {
//   // const authUser = await serverAuth();
//   const isT = false;

//   if (isT) {
//     return NextResponse.next();
//   }
//   const loginUrl = new URL("/denied", request.url);
//   return NextResponse.redirect(loginUrl);
// }

export default withAuth(
  async function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

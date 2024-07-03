import { NextResponse } from "next/server";
import { getCookieData } from "./utils/fetch/session/fetchSession";

function includes(collection, value) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i] === value) {
        return true;
      }
    }
    return false;
  } else if (typeof collection === "string") {
    return collection.indexOf(value) !== -1;
  }
  return false;
}

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/dashboard");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/profile");
};

export async function middleware(req) {
  const sessionData = await getCookieData();
  const role = await sessionData?.role;
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

export const config = { matcher: ["/dashboard/:path*", "/profile"] };

// "use client";
// import { getIsAuthenticated } from "./app/utils/Auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes = ["/dashboard"];

// export default async function middleware(req: NextRequest) {
//   // let isAuthenticated = false;
//   console.log("Executing on client side:", typeof window !== "undefined");
//   const isAuthenticated = await getIsAuthenticated();
//   console.log(isAuthenticated);
//   //   isAuthenticated =
//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
// Middleware.ts
// import { getIsAuthenticated } from "./app/utils/Auth";
// // import { getServerSession } from "next-auth";
// import { authOptions } from "../web/app/api/auth/[...nextauth]/route";
// import { getSession, useSession } from "next-auth/react";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import type { NextApiRequest } from "next";
// import { getServerSession } from "next-auth";

// const protectedRoutes = ["/dashboard"];

// export default async function middleware(req: NextRequest) {
//   // let isAuthenticated = await getIsAuthenticated();
//   // const currentUser = req.cookies.get("user")?.value;
//   // const { data: session } = useSession();
//   // console.log(session);
//   const session = await getServerSession(authOptions);
//   let isAuthenticated;
//   session ? (isAuthenticated = true) : (isAuthenticated = false);
//   console.log(isAuthenticated);
//   // const session = await getSession({ req });

//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
// import { withAuth } from "next-auth/middleware";

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (req.nextUrl.pathname.startsWith("/") && token === null) {
//         return false;
//       }
//       return true;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// });

// Middleware.ts
// import { getSession } from "next-auth/react";
// import { NextResponse } from "next/server";
// import type { NextApiRequest } from "next";

// const protectedRoutes = ["/dashboard"];

// export default async function middleware(req: NextApiRequest) {
//   const session = await getSession({ req });
//   console.log(session);

//   if (!session && protectedRoutes.includes(req.url!)) {
//     const absoluteURL = new URL("/login", req.headers.referer);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAuthenticated } from "./app/utils/Auth";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/dashboard"];
  const allCookies = request.cookies.getAll();
  const currentUser = request.cookies.get("next-auth.session-token")?.value;
  console.log("cokies:", allCookies);
  console.log("cokies token:", currentUser);

  const IsAuthenticated = true;
  // if (getIsAuthenticated) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  // return NextResponse.redirect(new URL("/login", request.url));
  if (!currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

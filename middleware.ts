// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import {decodeJwt} from "jose"

// export async function middleware(request: NextRequest) {
//    console.log("MIDDLEWARE: ", request.url)
//     // Autoriser toutes les requêtes POST (utile pour le login POST)
//    if(request.method === "POST") {
//      return NextResponse.next();
//    }
//    const cookieStore = await cookies();
//    const token = cookieStore.get("firebaseAuthToken")?.value;
   
//    if(token && request.nextUrl.pathname.startsWith("/login")) {
//          return NextResponse.redirect(new URL("/", request.url))
//    }
   
   
//    if(!token) {
//      return NextResponse.redirect(new URL("/", request.url))
//    }
//    const decodedToken = decodeJwt(token)

//    if(!decodedToken.admin) {
//        return NextResponse.redirect(new URL("/", request.url))
//    }

//    return NextResponse.next()
// }

// export const config = {
//     matcher: ["/admin-dashboard", "/admin-dashboard/:path*", "/login"],
// }

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE: ", request.url);

  // Autoriser toutes les requêtes POST (utile pour le login POST)
  if (request.method === "POST") {
    return NextResponse.next();
  }

  // Si la route est /login et pas connecté → on laisse passer
  if (request.nextUrl.pathname.startsWith("/login")) {
    const cookieStore = cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;

    // ✅ Si connecté, redirige vers /
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Pas connecté ? → autorisé à voir la page /login
    return NextResponse.next();
  }

  // Pour les autres routes (ex: /admin-dashboard), on vérifie l'auth
  const cookieStore = cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // ✅ Redirige vers /login si non connecté
  }

  const decodedToken = decodeJwt(token);

  if (!decodedToken.admin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard", "/admin-dashboard/:path*", "/login"],
};

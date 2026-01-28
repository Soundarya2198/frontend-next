import {NextResponse} from "next/server"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
   const token = request.cookies.get("token");
   const protectedRoutes = ["/dashboard", "/items"]
   const isProtected = protectedRoutes.some((route)=>
    request.nextUrl.pathname.startsWith(route)
  );
  if(isProtected && !token){
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/items/:path*"],
};

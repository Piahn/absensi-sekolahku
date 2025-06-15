import { NextRequest, NextResponse } from "next/server";

export const protectedPath = ["/dashboard", "/attendence", "/student"];
export const publicPath = ["/login", "/register"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;
    const isProtected = protectedPath.some((protectedPath) => path.startsWith(protectedPath));
    const isPublic = publicPath.some((publicPath) => path.startsWith(publicPath))

    if(token && isPublic) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if(!token && isProtected) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const Matcher = [
    "/dashboard",
    "/attendence",
    "/student",
    "/login",
    "/register"
]
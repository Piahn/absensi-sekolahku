import { NextRequest, NextResponse } from "next/server";

export const protectedPath = ["/dashboard", "/attendence", "/student"];
export const publicPath = ["/login", "/register"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    if(path === "/" && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if(path === "/" && !token) {
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
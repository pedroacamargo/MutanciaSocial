import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes, publicRoutes } from "@/router/routes";
import { UserCookies } from "./lib/interfaces/UserCredentials.interface";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("currentUser")?.value;
    
    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (publicRoutes.includes(request.nextUrl.pathname) && currentUser) {
        const parsedUserJSON: UserCookies = JSON.parse(currentUser);
        
        if (!parsedUserJSON.acceptedConditions) {
            return NextResponse.redirect(new URL('/welcome', request.url))
        }
    }
    
    if (protectedRoutes.includes(request.nextUrl.pathname) && currentUser) {
        const parsedUserJSON: UserCookies = JSON.parse(currentUser);

        if (parsedUserJSON.acceptedConditions) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
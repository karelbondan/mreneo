import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const user = request.cookies.get("user")?.value;

    // TODO: uncomment 3 baris di bawah untuk halaman lain selain login

    // if (!user && !request.nextUrl.pathname.startsWith("/login")){
    //     return Response.redirect(new URL("/login", request.url));
    // }

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    headers.set("x-current-params", request.nextUrl.searchParams.toString());
    return NextResponse.next({ headers });
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
import { NextRequest } from "next/server";
import { isAuthenticatedServer } from "@/lib/auth_server";

export async function middleware(request: NextRequest) {
    const hasLogged = await isAuthenticatedServer();
    const path = request.nextUrl.pathname;

    if (hasLogged) {
        if (path.startsWith('/login')) {
            return Response.redirect(new URL('/', request.url));
        }
    }
    else {
        if (path.startsWith('/view')
        || path.startsWith('/scanner')
        || path.startsWith('/game')
        || path === '/') {
            return Response.redirect(new URL('/login', request.url));
        }
    }
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
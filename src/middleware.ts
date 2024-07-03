import { NextRequest, NextResponse } from "next/server";
import { getGameProgressServer, isAuthenticatedServer } from "@/lib/auth_server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let hasLogged: string | null;

    if (path.startsWith('/error'))
        return;

    try {
        hasLogged = await isAuthenticatedServer();
    }
    catch (exception) {
        return Response.redirect(new URL('/error', request.url));
    }

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

    const response = NextResponse.next();
    if (path.startsWith('/game')) {
        const problem = (await getGameProgressServer()) as number;

        let openedProblem = problem;

        // TODO: add time constraint
        
        if (path.startsWith('/game/1')) {
            if (openedProblem < 0)
                return Response.redirect(new URL('/game', request.url));
        }
        if (path.startsWith('/game/2')) {
            if (openedProblem < 1)
                return Response.redirect(new URL('/game', request.url));
        }
        if (path.startsWith('/game/3')) {
            if (openedProblem < 3)
                return Response.redirect(new URL('/game', request.url));
        }

        response.cookies.set('opened_problem', openedProblem.toString());
    }
    if (path === '/') {
        response.cookies.set('team_name', hasLogged as string);
    }
    return response;
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
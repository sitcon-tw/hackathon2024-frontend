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
        let openedProblemByTime = 100;

        const currentTime = new Date();
        if (currentTime.getTime() < Date.parse("Sat, 06 Jul 2024 10:10:00 GMT+0800"))
            openedProblemByTime = Math.min(openedProblemByTime, 0);
        if (currentTime.getTime() < Date.parse("Sat, 06 Jul 2024 13:40:00 GMT+0800"))
            openedProblemByTime = Math.min(openedProblemByTime, 1);
        if (currentTime.getTime() < Date.parse("Sat, 06 Jul 2024 15:40:00 GMT+0800"))
            openedProblemByTime = Math.min(openedProblemByTime, 2);
        
        if (path.startsWith('/game/1')) {
            if (openedProblem < 0 || openedProblemByTime < 1)
                return Response.redirect(new URL('/game', request.url));
        }
        if (path.startsWith('/game/2')) {
            if (openedProblem < 1 || openedProblemByTime < 2)
                return Response.redirect(new URL('/game', request.url));
        }
        if (path.startsWith('/game/3')) {
            if (openedProblem < 3 || openedProblemByTime < 3)
                return Response.redirect(new URL('/game', request.url));
        }

        response.cookies.set('opened_problem', openedProblem.toString());
        response.cookies.set('opened_problem_by_time', openedProblemByTime.toString());
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
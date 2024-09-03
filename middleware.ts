import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { setAuthCookies, getAuthCookies, clearAuthCookies } from 'utils/auth';

import { NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//     const res = NextResponse.next();
//     // Create a Supabase client configured to use cookies
//     const requestUrl = new URL(req.url);

//     const supabase = createMiddlewareClient({ req, res });
//     // check session
//     const {
//         data: { session },
//         error,
//     } = await supabase.auth.getSession();

//     // if (!session || error) {
//     //     clearAuthCookies(res); // Pass 'res' to clear cookies on server-side
//     //     return NextResponse.redirect(`${requestUrl.origin}/login`);
//     // }

//     // navigation guard
//     if (session && req.url === `${requestUrl.origin}/login`) {
//         return NextResponse.redirect(`${requestUrl.origin}/`);
//     }
//     if (!session && (req.url === `${requestUrl.origin}/` || req.url.includes('/apps'))) {
//         return NextResponse.redirect(`${requestUrl.origin}/login`);
//     }
//     return res;
// }

export async function middleware(req: NextRequest) {
    // const res = NextResponse.next();
    // const requestUrl = new URL(req.url);
    // const supabase = "createMiddlewareClient({ req, res });"

    // // Fetch the session
    // const {
    //     data: { session },
    //     error,
    // } = await supabase.auth.getSession();

    // const LOGIN_URL = `${requestUrl.origin}/login`;
    // const HOME_URL = `${requestUrl.origin}/login`;

    // // Check for session. If error, log it for debugging.
    // if (session) {
    //     // Set session information in cookies
    //     setAuthCookies(session);
    // } else if (error) {
    //     // Clear cookies if there's an error fetching the session
    //     clearAuthCookies();
    //     console.error('Error fetching session:', error);
    // }

    // // Check if the current path is a public path

    // // Redirect logic
    // if (!session && (req.url === `${requestUrl.origin}/` || req.url.includes('/apps'))) {
    //     // If no session and not a public path, redirect to login
    //     return NextResponse.redirect(LOGIN_URL);
    // } else if (session && req.nextUrl.pathname === LOGIN_URL) {
    //     // If logged in and requesting the login page, redirect to home
    //     return NextResponse.redirect(HOME_URL);
    // }

    // // Continue to the requested page if no redirection occurred
    return NextResponse.next();
}

export const authenticateUser = (handler: any) => {
    return async (context: any) => {
        // const cookies = getAuthCookies(context);

        // // Check if the authentication token is present in cookies
        // const authToken = cookies.access_token;

        // // If token is present, set it in the context for further use
        // if (authToken) {
        //     context.authToken = authToken;
        // }

        // // Execute the original handler (page or API route)
        // let result;
        // if (handler) {
        //     if (typeof handler === 'function') {
        //         result = await handler(context);
        //     }
        // }

        // Default behavior
        return null;
    };
};

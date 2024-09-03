// utils/auth.ts
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { NextPageContext } from 'next';

export const setAuthCookies = (data) => {
    const { access_token, expires_in, refresh_token, user } = data;

    // Set cookies for authentication tokens
    setCookie({}, 'access_token', access_token, {
        path: '/',
        maxAge: expires_in,
        sameSite: 'strict',
    });

    setCookie({}, 'refresh_token', refresh_token, {
        path: '/',
        sameSite: 'strict',
    });

    // You can setCookie additional user-related information in cookies if needed
    setCookie({}, 'user', JSON.stringify(user), {
        path: '/',
        sameSite: 'strict',
    });
};

export const getAuthCookies = (cookieString: any) => {
    const cookies = parseCookies(cookieString);
    // Extract and return the necessary authentication cookies
    return {
        access_token: cookies.access_token || null,
        refresh_token: cookies.refresh_token || null,
        // Add other relevant cookies
    };
};

export const clearAuthCookies = () => {
    // Clear authentication cookies
    destroyCookie({}, 'access_token', { path: '/' });
    destroyCookie({}, 'refresh_token', { path: '/' });
    destroyCookie({}, 'user', { path: '/' });
};

export const isAuthenticated = (context: NextPageContext) => {
    const { req } = context;

    // Get authentication cookies
    const { access_token } = getAuthCookies(req?.headers.cookie);

    // Return true if access_token is present, indicating the user is logged in

    return Boolean(access_token);
};

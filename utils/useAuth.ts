// utils/useAuth.ts
import { useEffect } from 'react';
import { isAuthenticated } from './auth';
import Router from 'next/router';

export const useAuth = (context) => {
    useEffect(() => {
        if (
            !isAuthenticated(context) &&
            Router.pathname !== '/register' &&
            Router.pathname !== '/email-verification' &&
            Router.pathname !== '/reset-password' &&
            Router.pathname !== '/update-password'
        ) {
            // Redirect to login page if not authenticated
            Router.replace('/login');
        }
    }, []);
};

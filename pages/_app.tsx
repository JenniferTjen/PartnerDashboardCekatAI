import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, Suspense, useEffect } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/index';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from 'ni18n.config.ts';
import { useAuth } from '@/utils/useAuth';
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '../styles/tailwind.css';
import { NextPage } from 'next';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
    useAuth({});

    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={clientId}>
                <Head>
                    <title>Cekat.AI</title>
                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="Cekat AI" />
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <PersistGate loading={null} persistor={persistor}>
                    {getLayout(<Component {...pageProps} />)}
                </PersistGate>
            </GoogleOAuthProvider>
        </Provider>
    );
};
export default appWithI18Next(App, ni18nConfig);

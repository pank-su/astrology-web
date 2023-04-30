import App, {AppContext} from "next/app";
import {Cookies, CookiesProvider} from "react-cookie"

import "../public/styles/globals.css"


export default function MyApp({Component, pageProps, cookies}) {
    const isBrowser = typeof window !== "undefined";
    return <>
        <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
            <Component {...pageProps} />
        </CookiesProvider>

    </>

}

// Это всё необходимо для работы cookie
MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
};
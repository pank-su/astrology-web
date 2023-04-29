import {AppProps} from "next/app";
import Head from "next/head";
import "../public/styles/globals.css"


export default function App({Component, pageProps}: AppProps) {
    return <>
        <Component {...pageProps} />
    </>

}
import {Html, Head, Main, NextScript} from 'next/document'
import theme, {roboto} from '../public/styles/theme';
import Link from "next/link";
import React from "react";


export default function Document() {
    return (
        <Html lang="ru" className={roboto.className}>
            <Head>
                <meta name="theme-color" content={theme.palette.primary.main}/>
            </Head>
            <body>

                <Main/>

            <NextScript/>
            </body>
        </Html>
    )
}
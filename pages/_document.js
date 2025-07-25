/** 
 * Made because of mantine documentation: https://mantine.dev/guides/next/
 * "Create pages/_document.tsx file with ColorSchemeScript component. 
 * Note that it is required even if you use only one color scheme in your application."*/

import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export default function Document() {
return (
    <Html lang="en" {...mantineHtmlProps}>
    <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
    </Head>
    <body>
        <Main />
        <NextScript />
    </body>
    </Html>
);
}
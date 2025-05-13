import '@styles/globals.css'
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: 1.2,
    primaryColor: 'indigo',
});

function Application({ Component, pageProps }) {
    return (
        <MantineProvider theme={theme}>
            <Component {...pageProps} />
        </MantineProvider>
    )
}

export default Application

let apiUrl;

// process.env variables for netlify found here: https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
if (process.env.CONTEXT === 'production') {
    apiUrl = process.env.URL;
} else if (process.env.CONTEXT === 'deploy-preview') {
    apiUrl = process.env.DEPLOY_PRIME_URL;
} else {
    apiUrl = "";
}

export default apiUrl;
let apiUrl;

if (process.env.NODE_ENV === 'production') {
    apiUrl = process.env.URL;
} else if (process.env.NODE_ENV === 'deploy-preview') {
    apiUrl = process.env.DEPLOY_PRIME_URL;
} else {
    apiUrl = "";
}

export default apiUrl;
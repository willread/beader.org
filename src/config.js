const dev = {
    apiPath: 'http://localhost:3003',
    googleRedirectUri: 'http://localhost:3000',
};

const prod = {
    apiPath: 'https://beader-api.haqt.com',
    googleRedirectUri: 'https://beader.org',
};

export default {
    titleSuffix: ' | Beader',
    googleClientId: '204545753423-3igb69ajb3be6ftc6mu8ftkgmvqe3hcv.apps.googleusercontent.com',
    ...(process.env.REACT_APP_STAGE === 'prod' ? prod : dev)
};
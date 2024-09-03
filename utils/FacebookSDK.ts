export const initFacebookSdk = () => {
    return new Promise((resolve, reject) => {
        // Load the Facebook SDK asynchronously
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: process.env.NEXT_PUBLIC_FBSDK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v19.0',
            });
            // Resolve the promise when the SDK is loaded
            resolve();
        };
    });
};

export const getFacebookLoginStatus = () => {
    return new Promise((resolve, reject) => {
        window.FB.getLoginStatus((response) => {
            resolve(response);
        });
    });
};

export const fbSignUp = () => {
    return new Promise((resolve, reject) => {
        window.FB.login(
            function (response) {
                console.log(response);
                if (response.authResponse) {
                    console.log(response);
                    // You can pass additional data as an argument to resolve if needed
                    resolve(response);
                } else {
                    // You can pass an error message or the entire response to reject
                    reject('User cancelled login or did not fully authorize.');
                }
            },
            {
                config_id: process.env.NEXT_PUBLIC_FBSDK_CONFIG_ID_IG_FBSIGNUP,
                response_type: 'code',
                override_default_response_type: true,
                extras: {
                    sessionInfoVersion: 2,
                },
            }
        );
    });
};

export const igSignUp = () => {
    return new Promise((resolve, reject) => {
        window?.FB?.login(
            function (response) {
                console.log(response);
                if (response.authResponse) {
                    console.log(response);
                    // You can pass additional data as an argument to resolve if needed
                    resolve(response);
                } else {
                    // You can pass an error message or the entire response to reject
                    reject('User cancelled login or did not fully authorize.');
                }
            },
            {
                config_id: process.env.NEXT_PUBLIC_FBSDK_CONFIG_ID_IGSIGNUP,
                response_type: 'token',
                override_default_response_type: true,
                extras: {
                    sessionInfoVersion: 2,
                },
            }
        );
    });
};

export const messengerSignUp = () => {
    return new Promise((resolve, reject) => {
        window?.FB?.login(
            function (response) {
                console.log(response);
                if (response.authResponse) {
                    console.log(response);
                    // You can pass additional data as an argument to resolve if needed
                    resolve(response);
                } else {
                    // You can pass an error message or the entire response to reject
                    reject('User cancelled login or did not fully authorize.');
                }
            },
            {
                scope: 'pages_show_list,pages_manage_metadata,pages_messaging,pages_read_engagement,business_management', // Specify the required permissions here
                response_type: 'token',
                return_scopes: true, // Optional: Return the granted permissions in the response
                auth_type: 'rerequest', // Optional: Re-request permissions if they were previously declined
                extras: {
                    sessionInfoVersion: 2,
                },
            }
        );
    });
};

export const igDatasetSignUp = () => {
    return new Promise((resolve, reject) => {
        window?.FB?.login(
            function (response) {
                console.log(response);
                if (response.authResponse) {
                    console.log(response);
                    // You can pass additional data as an argument to resolve if needed
                    resolve(response);
                } else {
                    // You can pass an error message or the entire response to reject
                    reject('User cancelled login or did not fully authorize.');
                }
            },
            {
                config_id: process.env.NEXT_PUBLIC_FBSDK_CONFIG_ID_IGDATASET,
                response_type: 'code',
                override_default_response_type: true,
                extras: {
                    sessionInfoVersion: 2,
                },
            }
        );
    });
};

export const messengerDatasetSignUp = () => {
    return new Promise((resolve, reject) => {
        window?.FB?.login(
            function (response) {
                console.log(response);
                if (response.authResponse) {
                    console.log(response);
                    // You can pass additional data as an argument to resolve if needed
                    resolve(response);
                } else {
                    // You can pass an error message or the entire response to reject
                    reject('User cancelled login or did not fully authorize.');
                }
            },
            {
                config_id: process.env.NEXT_PUBLIC_FBSDK_CONFIG_ID_MSGDATASET,
                response_type: 'code',
                override_default_response_type: true,
                extras: {
                    sessionInfoVersion: 2,
                },
            }
        );
    });
};
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

export const msalConfig = {
    //development
    // auth: {
    //     clientId: "4eb94645-f796-4a6c-8d26-90034183ec02",
    //     authority: "https://login.microsoftonline.com/consumers",
    //     redirectUri: "http://localhost:5173/DashBoard/",
    // },
    //production
     auth: {
        clientId: "a09bca37-0a63-4cad-be11-2349cdf9c65e",
        authority: "https://login.microsoftonline.com/consumers",
        redirectUri: "https://fryderyk-dashboard.azurewebsites.net/",
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level: LogLevel, message:string, containsPii:boolean) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};




/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [
        "user.read",
        "tasks.read", 
        "tasks.read.shared",
        "tasks.readWrite",
        "tasks.readWrite.shared",
    ]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const listId = 'AQMkADAwATM0MDAAMS0zNDBjLThlMjgtMDACLTAwCgAuAAADBx6fJiF1jEy7S70EocuPXQEA0inBHZ0ZrUGyDGMihnpGdgAAAME4kAYAAAA=';
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphToDoEndpoint: `/me/todo/lists/${listId}/tasks`,
};
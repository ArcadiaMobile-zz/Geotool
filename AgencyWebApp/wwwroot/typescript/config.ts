type SiteConfiguration = {
    baseUrl: string;
    clientId: string;
    policy: string;
};

let dev = {
    preset: <"none" | "single" | "multi"> "multi",
    fakeSemanticWeb: false,
    fakeCampaign: false,
    fakeGeocodeAddress:false,
};

const isLocalHost = (document.location!.href.indexOf("localhost") > 0);
// Per evitare dimenticanze
if (!isLocalHost) {
    dev.preset = "none";
    dev.fakeSemanticWeb = false;
    dev.fakeCampaign = false;
    dev.fakeGeocodeAddress = false
}

// Definizioni delle chiavi per ogni host
const clientIds: { [hostname: string]: SiteConfiguration | undefined } = {
    "localhost": {
        clientId: "6759ca85-3e16-4f75-b91d-0eedcc98b948",//"5ed992e4-c93d-4a26-a889-6702c1760dd5", //"6759ca85-3e16-4f75-b91d-0eedcc98b948",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app-dev.azurewebsites.net": {
        clientId: "5ed992e4-c93d-4a26-a889-6702c1760dd5",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app-staging.azurewebsites.net": {
        clientId: "5a16b955-6a69-419e-87c8-285ce2e3ea3c",
        baseUrl: "https://arcadia-api-staging.azurewebsites.net",
        policy: "B2C_1_AgencyDevSignIn"
    },
    "admove-agenzie-app.azurewebsites.net": {
        clientId: "171c5f1a-59a9-4c65-8abe-2ed067d2288f",
        baseUrl: "https://arcadia-api.azurewebsites.net",
        policy: "B2C_1_AgencySignIn"
    },
    "agency.admove.com": {
        clientId: "171c5f1a-59a9-4c65-8abe-2ed067d2288f",
        baseUrl: "https://arcadia-api.azurewebsites.net",
        policy: "B2C_1_AgencySignIn"
    }
};
let redirect: string = `${document.location!.protocol}//${document.location!.host}`;
const config: SiteConfiguration | undefined = clientIds[document.location!.hostname.toLowerCase()];

let baseUrl: string;
let getLoginUrl: (r?: string) => string;
if (!config) {
    console.error("No configuration for " + document.location!.host);
} else {
    baseUrl = config.baseUrl;
    console.log(config.policy);
    console.log(config.clientId);
    console.log(encodeURIComponent(""));
    console.log(encodeURIComponent(redirect));

    getLoginUrl = (r: string = "") => `https://login.microsoftonline.com/admovecom.onmicrosoft.com/oauth2/v2.0/authorize?p=${config.policy}&client_id=${config.clientId}&nonce=defaultNonce&redirect_uri=${encodeURIComponent(redirect)}&scope=openid&response_type=id_token&prompt=login&state=${encodeURIComponent(r)}`;
 }

const landingUrlAdmove: string = (isLocalHost || document.location!.hostname.toLowerCase() == "admove-agenzie-app-dev.azurewebsites.net") ? 'https://ads-dev.admove.com/' : 'https://ads.admove.com/';
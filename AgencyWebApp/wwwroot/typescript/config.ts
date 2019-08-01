type SiteConfiguration = {
    baseUrl: string;
    clientId: string;
    policy: string;
};

let dev = {
    preset: <"none" | "single" | "multi"> "multi",
    fakeSemanticWeb: false,
    fakeCampaign: false,
    fakeGeocodeAddress: false,
    fakeInsight:false
};

const isLocalHost = (document.location!.href.indexOf("localhost") > 0);
// Per evitare dimenticanze
if (!isLocalHost) {
    dev.preset = "none";
    dev.fakeSemanticWeb = false;
    dev.fakeCampaign = false;
    dev.fakeGeocodeAddress = false;
    dev.fakeInsight= false
}

// Definizioni delle chiavi per ogni host
const clientIds: { [hostname: string]: SiteConfiguration | undefined } = {
    "localhost": {
        clientId: "711c5e4a-0241-45c7-984a-5d6f1b80fe59",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_GeoSignIn"
    },
    "getooltest.azurewebsites.net": {
        clientId: "711c5e4a-0241-45c7-984a-5d6f1b80fe59",
        baseUrl: "https://arcadia-api-dev.azurewebsites.net",
        policy: "B2C_1_GeoSignIn"
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
    getLoginUrl = (r: string = "") => `https://login.microsoftonline.com/GeotoolTenant.onmicrosoft.com/oauth2/v2.0/authorize?p=${config.policy}&client_id=${config.clientId}&nonce=defaultNonce&redirect_uri=${encodeURIComponent(redirect)}&scope=openid&response_type=id_token&prompt=login&state=${encodeURIComponent(r)}`;
 }

const landingUrlAdmove: string = (isLocalHost || document.location!.hostname.toLowerCase() == "admove-agenzie-app-dev.azurewebsites.net") ? 'https://ads-dev.admove.com/' : 'https://ads.admove.com/';
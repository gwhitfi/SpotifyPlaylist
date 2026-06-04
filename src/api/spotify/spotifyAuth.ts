const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CALLBACK_URL = "http://127.0.0.1:5173/callback";
interface SpotifyTokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
    scope: string;
}

const generateRandomString = (length: number) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

export default async function requestUserAuth() {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = CALLBACK_URL;

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope =
        "user-read-private user-read-email playlist-modify-public playlist-modify-private";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

export const getToken = async () => {
    const code = new URLSearchParams(window.location.search).get("code");

    const codeVerifier = localStorage.getItem("code_verifier");
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const url = TOKEN_URL;
    const redirectUri = CALLBACK_URL;
    if (!code || !codeVerifier) return false;
    const payload = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };
    const body = await fetch(url, payload);
    if (!body.ok) {
        console.error(`Spotify Login Authorization Failed ${body.status}`);
        return false;
    }

    const response: SpotifyTokenResponse = await body.json();
    localStorage.setItem("token_expiry", String(Date.now() + response.expires_in * 1000));
    localStorage.setItem("access_token", response.access_token);
    if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
    }
    return true;
};

export const refreshToken = async () => {
    const tokenExpiry = Number(localStorage.getItem("token_expiry"));

    if (Date.now() < tokenExpiry - 30000) return false;

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const url = TOKEN_URL;
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) return false;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: clientId,
            }),
        });
        if (!response.ok) {
            console.error(`Spotify Refresh Token Failed ${response.status}`);
            return false;
        }
        const data: SpotifyTokenResponse = await response.json();

        localStorage.setItem("token_expiry", String(Date.now() + data.expires_in * 1000));
        localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
        }
        return true;
    } catch (error) {
        return false;
    }
};

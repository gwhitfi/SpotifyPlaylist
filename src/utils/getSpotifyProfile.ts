import { refreshToken } from "../api/SpotifyAuth";

export async function getSpotifyProfile(retried = false) {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });

    if (response.status === 401 && !retried) {
        const refreshed = await refreshToken();
        if (!refreshed) return null;
        return getSpotifyProfile(true);
    }
    const data = await response.json();
    return data;
}

import { refreshToken } from "./spotifyAuth";

export interface SpotifyProfile {
    account_id: string;
    country: string;
    display_name: string;
    email: string;
    id: string;
    uri: string;
    images: {
        height: number;
        width: number;
        url: string;
    }[];
}

export async function getSpotifyProfile(): Promise<SpotifyProfile | null> {
    await refreshToken();
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return null;

    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error(`Spotify API error on accessing user profile: ${response.status}`);
            return null;
        }

        const data: SpotifyProfile = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

import type { MusicBrainzArtist } from "./musicBrainzArtistSearch";

export interface FanArtResponse {
    artistbackground: {
        height: string;
        width: string;
        url: string;
        likes: string;
    }[];
    hdmusiclogo: {
        height: string;
        width: string;
        url: string;
        likes: string;
    }[];
}

export async function fanartTVArtSearch(artist: MusicBrainzArtist): Promise<FanArtResponse | null> {
    const apiKey = import.meta.env.VITE_FAN_ART_API_KEY;
    if (!apiKey) return null;
    const url = `/fanart/v3.2/music/${artist.id}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error getting response from FanArt.TV: ${response.status}`);
            return null;
        }
        const data: FanArtResponse = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const PLACEHOLDER =
    "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";

interface LastFMImage {
    "#text": string;
    size?: "small" | "medium" | "large" | "extralarge";
}

interface LastFMAlbum {
    image?: LastFMImage[];
}

interface LastFMTrack {
    album?: LastFMAlbum;
}

interface LastFMResponse {
    track?: LastFMTrack;
}

export async function lastFMAlbumArtSearch(artistName: string, songName: string): Promise<string> {
    const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;
    if (!apiKey) {
        console.error("Missing Last.fm API Key");
        return PLACEHOLDER;
    }
    const params = new URLSearchParams({
        artist: artistName,
        track: songName,
        format: "json",
        api_key: apiKey,
    });
    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&${params}`,
        );

        if (!response.ok) {
            console.error(`Last.fm API request failed: ${response.status}`);
            return PLACEHOLDER;
        }
        const data: LastFMResponse = await response.json();

        const artUrl =
            data?.track?.album?.image?.find((image) => image.size === "medium")?.["#text"] ||
            PLACEHOLDER;
        return artUrl;
    } catch (error) {
        console.error(error);
        return PLACEHOLDER;
    }
}

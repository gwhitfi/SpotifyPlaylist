interface MusicBrainzArtist {
    id: string;
    score: number;
    name: string;
    country?: string;
    "life-span"?: {
        begin?: string | null;
        ended?: string | null;
    };
    disambiguation?: string;
}

interface MusicBrainzResponse {
    artists: MusicBrainzArtist[];
}

export async function musicBrainzArtistSearch(userInput: string): Promise<MusicBrainzArtist[]> {
    const params = new URLSearchParams({
        query: userInput,
        fmt: "json",
    });
    try {
        const response = await fetch(`https://musicbrainz.org/ws/2/artist?${params}`);
        if (!response.ok) {
            console.error(`MusicBrainz API Failed: ${response.status}`);
            return [];
        }
        const data: MusicBrainzResponse = await response.json();
        console.log("DATA: ", data);
        return data.artists ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

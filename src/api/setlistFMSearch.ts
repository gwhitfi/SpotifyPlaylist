export interface Cover {
    disambiguation?: string;
    mbid?: string;
    name?: string;
}

export interface Song {
    name: string;
    cover?: Cover;
}

export interface Set {
    encore?: number;
    song: Song[];
}

export interface SetlistArtist {
    disambiguation?: string;
    mbid: string;
    name: string;
}

export interface Setlist {
    id: string;
    artist: SetlistArtist;
    eventDate?: string;
    sets: {
        set: Set[];
    };
}

interface SetlistFMResponse {
    setlist: Setlist[];
    page?: number;
    itemsPerPage?: number;
    total: number;
}

export async function setlistFMSearch(selectedArtist: string): Promise<Setlist[]> {
    const apiKey = import.meta.env.VITE_SETLIST_API_KEY;
    if (!apiKey) {
        console.error("Missing Setlist.fm API Key");
        return [];
    }

    try {
        const response = await fetch(
            `/setlist/rest/1.0/artist/${encodeURIComponent(selectedArtist)}/setlists`,
            {
                headers: {
                    "x-api-key": apiKey,
                    Accept: "application/json",
                },
            },
        );

        if (!response.ok) {
            console.error(`Setlist.fm API request failed: ${response.status}`);
            return [];
        }

        const data: SetlistFMResponse = await response.json();
        const setlists = data.setlist;
        return setlists ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

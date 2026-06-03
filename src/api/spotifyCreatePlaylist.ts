import type { SpotifyPlaylistQueue } from "../components/SetlistCard";
import { refreshToken } from "./spotifyAuth";
interface SpotifyPlaylist {
    href: string;
    name: string;
    id: string;
}
interface SpotifyTrackSearchResponse {
    tracks: {
        items: {
            id: string;
            uri: string;
            name: string;
        }[];
    };
}
export async function spotifyCreatePlaylist(playlistQueue: SpotifyPlaylistQueue[], artist: string) {
    await refreshToken();
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return false;
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${artist} - Recent Songs`,
                description: "Created by Setlist Playlist",
                public: false,
            }),
        });

        if (!response.ok) {
            console.error(`Spotify API Error on Playlist Creation: ${response.status}`);
            return false;
        }
        const playlist: SpotifyPlaylist = await response.json();

        const playlistSongs = await searchTracks(playlistQueue, accessToken);
        return await addTracksToPlaylist(playlist.id, playlistSongs, accessToken);
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function searchTracks(playlistQueue: SpotifyPlaylistQueue[], accessToken: string) {
    const trackUris = await Promise.all(
        playlistQueue.map(async (entry: SpotifyPlaylistQueue) => {
            try {
                const query = `track:${entry.song} artist:${entry.artist}`;
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                if (!response.ok) {
                    console.error(`Spotify API Error on Track Search: ${response.status}`);
                    return false;
                }

                const data: SpotifyTrackSearchResponse = await response.json();
                return data.tracks.items[0]?.uri ?? false;
            } catch (error) {
                console.error(`Failed to find ${entry.song} by ${entry.artist}`, error);
                return false;
            }
        }),
    );
    return trackUris.filter((trackUri): trackUri is string => typeof trackUri === "string");
}

async function addTracksToPlaylist(playlistId: string, trackUris: string[], accessToken: string) {
    if (trackUris.length === 0) return false;
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: trackUris,
                position: 0,
            }),
        });
        if (!response.ok) {
            console.error(`Spotify API Error on Adding Tracks to Playlist: ${response.status}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

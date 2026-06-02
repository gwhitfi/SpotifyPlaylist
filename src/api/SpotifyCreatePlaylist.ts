export async function SpotifyCreatePlaylist(userProfile: any, artist: any, playlistQueue: any) {
    const accessToken = localStorage.getItem("access_token");
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Test Playlist",
                description: "Created by Setlist Playlist",
                public: false,
            }),
        });
        const playlist = await response.json();
        const playlistTracks = await searchTracks(playlistQueue);
        console.log("Playlist:", playlist);
        await addTracksToPlaylist(playlist.id, playlistTracks);
        console.log("COMPLETE");
    } catch (error) {
        console.error(error);
    }
}

async function searchTracks(playlistSongs: any) {
    const accessToken = localStorage.getItem("access_token");

    const trackUris = await Promise.all(
        playlistSongs.map(async (song: any) => {
            try {
                const query = `track:${song.name} artist:${song.artist}`;
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                const data = await response.json();
                console.log(data.tracks.items[0]);
                return data.tracks.items[0]?.uri ?? null;
            } catch (error) {
                console.error(`Failed to find ${song.name} by ${song.artist}`, error);
            }
            return null;
        }),
    );
    return trackUris.filter((trackUri): trackUri is string => trackUri !== null);
}

async function addTracksToPlaylist(playlistId: string, trackUris: string[]) {
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
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
            const error = await response.json();
            console.error("ERROR:", error);
            throw new Error(error.error?.message || "Spotify request failed");
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

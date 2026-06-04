import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";
import { spotifyCreatePlaylist } from "../api/spotifyCreatePlaylist";
import { Button } from "./Button";
import type { SpotifyPlaylistQueue } from "./SetlistCard";

interface PlaylistCreationProps {
    playlistQueue: SpotifyPlaylistQueue[];
    artist: MusicBrainzArtist;
}
export function PlaylistCreation({ playlistQueue, artist }: PlaylistCreationProps) {
    const handleCreatePlaylist = async () => {
        try {
            const createdSuccessfully = await spotifyCreatePlaylist(playlistQueue, artist.name);
            if (!createdSuccessfully) {
                console.error("Playlist not created");
                return;
            }
            console.log("Playlist created successfully!");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Button
                buttonLabel="Create Playlist"
                onClick={handleCreatePlaylist}
                disabled={playlistQueue.length === 0}
            />
        </div>
    );
}

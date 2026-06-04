import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";
import { spotifyCreatePlaylist } from "../api/spotifyCreatePlaylist";
import { Button } from "./Button";
import type { SpotifyPlaylistQueue } from "./SetlistCard";

interface PlaylistCreationProps {
    playlistQueue: SpotifyPlaylistQueue[];
    artist: MusicBrainzArtist;
}
function PlaylistCreation({ playlistQueue, artist }: PlaylistCreationProps) {
    return (
        <div>
            <Button
                buttonLabel="Create Playlist"
                color="green"
                onClick={() => spotifyCreatePlaylist(playlistQueue, artist.name)}
                defaultStatus={false}
            />
        </div>
    );
}

export default PlaylistCreation;

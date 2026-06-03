import { spotifyCreatePlaylist } from "../api/spotifyCreatePlaylist";

function PlaylistCreation({ playlistQueue, artist }: any) {
    return (
        <div>
            <button onClick={() => spotifyCreatePlaylist(playlistQueue, artist.name)}>
                Create Playlist
            </button>
        </div>
    );
}

export default PlaylistCreation;

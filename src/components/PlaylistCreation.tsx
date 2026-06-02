import { SpotifyCreatePlaylist } from "../api/SpotifyCreatePlaylist";

function PlaylistCreation({ playlistQueue }: any) {
    return (
        <div>
            <button onClick={() => SpotifyCreatePlaylist(playlistQueue)}>Create Playlist</button>
        </div>
    );
}

export default PlaylistCreation;

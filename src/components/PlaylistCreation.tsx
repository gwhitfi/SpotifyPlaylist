import { SpotifyCreatePlaylist } from "../api/SpotifyCreatePlaylist";

function PlaylistCreation({ userProfile, artist, playlistQueue }: any) {
    return (
        <div>
            <button onClick={() => SpotifyCreatePlaylist(userProfile, artist, playlistQueue)}>
                Create Playlist
            </button>
        </div>
    );
}

export default PlaylistCreation;

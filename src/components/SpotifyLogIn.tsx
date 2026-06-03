import requestUserAuth from "../api/spotifyAuth";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";
function SpotifyLogIn({ profile }: any) {
    let name = profile ? profile?.display_name : "Spotify Login";
    let logo = profile?.images?.[1]?.url ?? spotifyLogo;
    return (
        <div className="flex justify-center">
            <button
                className="rounded-2xl px-4 py-1 bg-green-500 cursor-pointer hover:bg-green-400"
                onClick={requestUserAuth}
            >
                <div className="flex items-center gap-2 font-bold text-lg">
                    <img className="w-6 rounded-xl" src={logo} alt="logo" />
                    {name}
                </div>
            </button>
        </div>
    );
}
export default SpotifyLogIn;

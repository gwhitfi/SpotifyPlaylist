import { useEffect, useRef, useState } from "react";
import requestUserAuth, { getToken } from "../api/spotifyAuth";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";
import { getSpotifyProfile } from "../utils/getSpotifyProfile";

function SpotifyLogIn() {
    const [spotifyProfile, setSpotifyProfile] = useState<any>();
    const exchangedRef = useRef(false);

    useEffect(() => {
        if (exchangedRef.current) return;
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            exchangedRef.current = true;
            getToken().then(() => {
                window.history.replaceState({}, "", "/");
            });
        } else if (localStorage.getItem("access_token")) {
            getSpotifyProfile().then(setSpotifyProfile);
        }
    }, []);
    let name = "Log In";
    let profilePic = spotifyLogo;

    if (spotifyProfile) {
        name = spotifyProfile?.display_name;
        profilePic = spotifyProfile?.images?.[1]?.url;
        localStorage.setItem("user_id", spotifyProfile.id);
    }
    return (
        <div className="flex justify-center">
            <button
                className="rounded-2xl px-4 py-1 bg-green-500 cursor-pointer hover:bg-green-400"
                onClick={requestUserAuth}
            >
                <div className="flex items-center gap-2 font-bold text-lg">
                    <img className="w-6 rounded-xl" src={profilePic} alt="logo" />
                    {name}
                </div>
            </button>
        </div>
    );
}
export default SpotifyLogIn;

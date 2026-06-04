import { useEffect, useRef, useState } from "react";
import requestUserAuth, { getToken } from "../api/spotifyAuth";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";
import { getSpotifyProfile } from "../utils/getSpotifyProfile";
import type { SpotifyProfile } from "../utils/getSpotifyProfile";

export function SpotifyLogIn() {
    const [spotifyProfile, setSpotifyProfile] = useState<SpotifyProfile | null>(null);
    const exchangedRef = useRef(false);

    useEffect(() => {
        if (exchangedRef.current) return;
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            exchangedRef.current = true;
            const exchangeCode = async () => {
                const success = await getToken();
                if (success) {
                    window.history.replaceState({}, "", "/");
                }
            };
            exchangeCode();
        } else if (localStorage.getItem("access_token")) {
            const loadProfile = async () => {
                try {
                    const profile = await getSpotifyProfile();
                    setSpotifyProfile(profile);
                    if (profile) localStorage.setItem("user_id", profile.id);
                } catch (error) {
                    console.error(`Error fetching spotify profile ${error}`);
                }
            };
            loadProfile();
        }
    }, []);

    const name = spotifyProfile?.display_name ?? "Log In";
    const profilePic =
        spotifyProfile?.images?.find((image) => image.height === 300)?.url ?? spotifyLogo;

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

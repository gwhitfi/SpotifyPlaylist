import { useEffect, useRef, useState } from "react";
import spotifyLogo from "../../assets/Spotify_Primary_Logo_RGB_White.png";
import { getSpotifyProfile } from "../../api/spotify/getSpotifyProfile";
import type { SpotifyProfile } from "../../api/spotify/getSpotifyProfile";
import { ProfileMenu } from "./ProfileMenu";
import { useClickOutside } from "../../hooks/useClickOutside";

export function SpotifyProfileButton() {
    const [spotifyProfile, setSpotifyProfile] = useState<SpotifyProfile | null>(null);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) return;

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
    }, []);

    useClickOutside(menuRef, () => setOpenProfileMenu(false));

    const profilePic =
        spotifyProfile?.images?.find((image) => image.height === 300)?.url ?? spotifyLogo;

    return (
        <div ref={menuRef} className="flex flex-col justify-center relative">
            <button onClick={() => setOpenProfileMenu((prev) => !prev)}>
                <img
                    className="cursor-pointer rounded-full w-12 border border-neutral-700 hover:border-neutral-400"
                    src={profilePic}
                    alt="logo"
                />
            </button>
            {openProfileMenu && (
                <ProfileMenu
                    spotifyProfile={spotifyProfile}
                    closeMenu={() => setOpenProfileMenu(false)}
                />
            )}
        </div>
    );
}

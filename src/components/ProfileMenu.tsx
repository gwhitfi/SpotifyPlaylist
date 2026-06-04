import { useNavigate } from "react-router-dom";
import { reportIssue } from "../utils/reportIssue";
import { MenuButton } from "./MenuButton";
import { spotifyLogout } from "../utils/spotifyLogout";
import { BookOpen, Bug, HomeIcon, Info, LogIn, LogOut } from "lucide-react";
import type { SpotifyProfile } from "../utils/getSpotifyProfile";
import spotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";
import requestUserAuth from "../api/spotifyAuth";

interface ProfileMenuProps {
    spotifyProfile: SpotifyProfile | null;
    closeMenu: () => void;
}
export function ProfileMenu({ spotifyProfile }: ProfileMenuProps) {
    const navigate = useNavigate();
    const name = spotifyProfile?.display_name ?? "Connect Spotify";
    const profilePic =
        spotifyProfile?.images?.find((image) => image.height === 300)?.url ?? spotifyLogo;

    return (
        <div className="absolute top-full bg-neutral-900 -left-32 w-42 z-10 border border-neutral-700 p-2 rounded-xl text-center">
            <div className="flex justify-around items-center border-b py-2">
                <img className="w-6 h-6 rounded-full" src={profilePic} alt="logo" />
                <p className="text-md ">{name}</p>
            </div>
            <MenuButton onClick={() => navigate("/home")} icon={HomeIcon} text="Home" />

            <MenuButton onClick={() => reportIssue()} icon={Bug} text="Report Issue" />
            <MenuButton onClick={() => navigate("/help")} icon={Info} text="Help" />
            <MenuButton onClick={() => navigate("/about")} icon={BookOpen} text="About" />
            {spotifyProfile && (
                <MenuButton onClick={() => spotifyLogout()} icon={LogOut} text="Log Out" />
            )}
            {!spotifyProfile && (
                <MenuButton onClick={() => requestUserAuth()} icon={LogIn} text="Log In" />
            )}
        </div>
    );
}

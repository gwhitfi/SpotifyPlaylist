import { SpotifyProfileButton } from "./SpotifyProfileButton";

export function NavBar() {
    return (
        <nav className="flex items-center justify-between px-3">
            <a href="/">
                <h1 className="text-4xl text-center p-2">Setlists &rarr; Playlist</h1>
            </a>
            <SpotifyProfileButton />
        </nav>
    );
}

import type { Dispatch, SetStateAction } from "react";
import type { SpotifyPlaylistQueue } from "../components/SetlistCard";

export function updatePlaylistQueue(
    setPlaylistQueue: Dispatch<SetStateAction<SpotifyPlaylistQueue[]>>,
    songName: string,
    artistName: string,
    checked: boolean,
) {
    if (checked) {
        setPlaylistQueue((prev) => [...prev, { song: songName, artist: artistName }]);
    }
    if (!checked) {
        setPlaylistQueue((prev) => prev.filter((entry) => entry.song !== songName));
    }
}

import type { Dispatch, SetStateAction } from "react";
import type { SpotifyPlaylistQueue } from "../components/setlist/SetlistCard";

export function updatePlaylistQueue(
    setPlaylistQueue: Dispatch<SetStateAction<SpotifyPlaylistQueue[]>>,
    songName: string,
    artistName: string,
    isCover: boolean,
    checked: boolean,
) {
    if (checked) {
        setPlaylistQueue((prev) => {
            if (prev.some((entry) => entry.song === songName)) return prev;
            return [...prev, { song: songName, artist: artistName, isCover: isCover }];
        });
    }
    if (!checked) {
        setPlaylistQueue((prev) => prev.filter((entry) => entry.song !== songName));
    }
}

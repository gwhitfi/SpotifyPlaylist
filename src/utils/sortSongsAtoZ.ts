import type { ParsedSong } from "./parseSetlist";
import type { SortState } from "../components/SetlistCard";
export function sortSongsAtoZ(parsedSongs: ParsedSong[], sortState: SortState) {
    if (sortState === "asc") return [...parsedSongs].sort((a, b) => a.name.localeCompare(b.name));
    if (sortState === "desc") return [...parsedSongs].sort((a, b) => b.name.localeCompare(a.name));
    return parsedSongs;
}

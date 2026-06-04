import { useEffect, useState } from "react";
import { parseSetlist, type ParsedSong } from "../utils/parseSetlist";
import { SongCard } from "./SongCard";
import { Funnel } from "lucide-react";
import { setlistFMSearch } from "../api/setlistFMSearch";
import { updatePlaylistQueue } from "../utils/updatePlaylistQueue";
import { Button } from "./Button";
import { sortSongsAtoZ } from "../utils/sortSongsAtoZ";
import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";
import { FilterPanel } from "./FilterPanel";
import { PlaylistCreation } from "./PlaylistCreation";

export interface SpotifyPlaylistQueue {
    song: string;
    artist: string;
    isCover: boolean;
}

interface SetlistCardProps {
    selectedArtist: MusicBrainzArtist;
}

export type SortState = "default" | "asc" | "desc";
export const nextState: Record<SortState, SortState> = {
    default: "asc",
    asc: "desc",
    desc: "default",
};

export function SetlistCard({ selectedArtist }: SetlistCardProps) {
    const [parsedSongs, setParsedSongs] = useState<ParsedSong[]>([]);
    const [playlistQueue, setPlaylistQueue] = useState<SpotifyPlaylistQueue[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [showCovers, setShowCovers] = useState(true);
    const [sortState, setSortState] = useState<SortState>("default");

    const sortedSongs =
        parsedSongs && sortState !== "default"
            ? sortSongsAtoZ(parsedSongs, sortState)
            : parsedSongs;
    const visibleSongs = showCovers ? sortedSongs : sortedSongs?.filter((song) => !song.isCover);
    useEffect(() => {
        if (!selectedArtist) return;
        setPlaylistQueue([]);
        setSelectAll(false);
        setFiltersOpen(false);
        setShowCovers(true);
        setSortState("default");
        const loadSetlist = async () => {
            try {
                const setlist = await setlistFMSearch(selectedArtist.id);
                setParsedSongs(Array.from(parseSetlist(setlist).values()));
            } catch (error) {
                console.error(error);
            }
        };
        loadSetlist();
    }, [selectedArtist]);

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-xl p-5 gap-2">
            <PlaylistCreation artist={selectedArtist} playlistQueue={playlistQueue} />
            <div className="flex justify-between items-end p-3 w-full">
                <div className="flex">
                    <Funnel
                        className="hover:cursor-pointer hover:text-green-400"
                        onClick={() => setFiltersOpen((prev) => !prev)}
                    />
                    <FilterPanel
                        onToggleCovers={() => {
                            if (showCovers) {
                                setPlaylistQueue((prev) => prev.filter((song) => !song.isCover));
                            }
                            setShowCovers((prev) => !prev);
                        }}
                        onSort={() => setSortState((prev) => nextState[prev])}
                        isOpen={filtersOpen}
                        sortState={sortState}
                        coversActive={showCovers}
                    />
                </div>
                <div className="flex flex-col items-end">
                    <Button
                        buttonLabel="Select All"
                        color="violet"
                        onClick={() => setSelectAll((prev) => !prev)}
                        isActive={selectAll}
                    />
                    <p className="text-end">Selected Songs: {playlistQueue.length}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {visibleSongs?.map((song: ParsedSong) => {
                    return (
                        <SongCard
                            key={song.name}
                            song={song}
                            handleCheck={(
                                songName: string,
                                songArtist: string,
                                isCover: boolean,
                                checked: boolean,
                            ) =>
                                updatePlaylistQueue(
                                    setPlaylistQueue,
                                    songName,
                                    songArtist,
                                    isCover,
                                    checked,
                                )
                            }
                            selectAll={selectAll}
                        />
                    );
                })}
            </div>
        </div>
    );
}

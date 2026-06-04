import { useEffect, useState } from "react";
import { parseSetlist, type ParsedSong } from "../utils/parseSetlist";
import SongCard from "./SongCard";
import { Funnel } from "lucide-react";
import FiltersModal from "./FiltersModal";
import PlaylistCreation from "./PlaylistCreation";
import { setlistFMSearch } from "../api/setlistFMSearch";
import { updatePlaylistQueue } from "../utils/updatePlaylistQueue";
import { Button } from "./Button";
import { sortSongsAtoZ } from "../utils/sortSongsAtoZ";
import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";

export interface SpotifyPlaylistQueue {
    song: string;
    artist: string;
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

function SetlistCard({ selectedArtist }: SetlistCardProps) {
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
    useEffect(() => {
        if (!selectedArtist) return;
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
                    <FiltersModal
                        showCovers={() => setShowCovers((prev) => !prev)}
                        isSorted={() => setSortState((prev) => nextState[prev])}
                        isHidden={filtersOpen}
                        sortState={sortState}
                    />
                </div>
                <div className="flex flex-col items-end">
                    <Button
                        buttonLabel="Select All"
                        color="violet"
                        onClick={() => setSelectAll((prev) => !prev)}
                        defaultStatus={false}
                    />
                    <p className="text-end">Selected Songs: {playlistQueue.length}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {sortedSongs?.map((song: ParsedSong, index: number) => {
                    return (
                        <SongCard
                            key={index}
                            song={song}
                            handleCheck={(songName: string, songArtist: string, checked: boolean) =>
                                updatePlaylistQueue(setPlaylistQueue, songName, songArtist, checked)
                            }
                            selectAll={selectAll}
                            showCovers={showCovers}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default SetlistCard;

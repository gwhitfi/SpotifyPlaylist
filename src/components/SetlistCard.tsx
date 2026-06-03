import { useEffect, useState } from "react";
import { parseSetlist } from "../utils/parseSetlist";
import SongCard from "./SongCard";
import { Funnel } from "lucide-react";
import FiltersModal from "./FiltersModal";
import PlaylistCreation from "./PlaylistCreation";
import { setlistFMSearch } from "../api/setlistFMSearch";

export interface SpotifyPlaylistQueue {
    song: string;
    artist: string;
}

function SetlistCard({ selectedArtist, userProfile }: any) {
    const [parsedSongs, setParsedSongs] = useState<any>([]);
    const [playlistQueue, setPlaylistQueue] = useState<SpotifyPlaylistQueue[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [showCovers, setShowCovers] = useState(true);
    const [isSorted, setIsSorted] = useState(false);
    const sortedSongs =
        isSorted && parsedSongs
            ? [...parsedSongs].sort((a, b) => a.name.localeCompare(b.name))
            : parsedSongs;

    const handleCheck = (songName: string, artistName: string, checked: boolean) => {
        if (checked) {
            setPlaylistQueue((prev) => [...prev, { song: songName, artist: artistName }]);
        }
        if (!checked) {
            setPlaylistQueue((prev) => prev.filter((entry) => entry.song !== songName));
        }
    };

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
        <>
            <PlaylistCreation
                artist={selectedArtist}
                userProfile={userProfile}
                playlistQueue={playlistQueue}
            />
            <div className="flex justify-between p-3">
                <div className="flex">
                    <Funnel onClick={() => setFiltersOpen((prev) => !prev)} />
                    <FiltersModal
                        onCoversCheck={setShowCovers}
                        onSort={() => setIsSorted((prev) => !prev)}
                        showCovers={showCovers}
                        isSorted={isSorted}
                        isHidden={filtersOpen}
                    />
                </div>
                <button
                    className={`px-3 py-1 rounded-full ${selectAll ? "bg-violet-500 text-white" : "bg-neutral-200 text-neutral-900"}`}
                    onClick={() => setSelectAll((prev) => !prev)}
                >
                    Select All
                </button>
            </div>

            <p className="text-end pr-5">Selected Songs: {playlistQueue.length}</p>
            <div className="flex flex-col gap-2 p-5">
                {sortedSongs?.map((song: any, index: any) => {
                    return (
                        <SongCard
                            key={index}
                            song={song}
                            handleCheck={handleCheck}
                            selectAll={selectAll}
                            showCovers={showCovers}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default SetlistCard;

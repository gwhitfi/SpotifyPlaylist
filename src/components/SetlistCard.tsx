import { useState } from "react";
import { parseSetlist } from "../utils/parseSetlist";
import SongCard from "./SongCard";
import { Funnel } from "lucide-react";
import FiltersModal from "./FiltersModal";
import PlaylistCreation from "./PlaylistCreation";

export interface SpotifyPlaylistQueue {
    song: string;
    artist: string;
}
function SetlistCard({ artistSetlist, selectedArtist, userProfile }: any) {
    const parsedSongs = Array.from(parseSetlist(artistSetlist).values());
    const [playlistQueue, setPlaylistQueue] = useState<SpotifyPlaylistQueue[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showCovers, setShowCovers] = useState(true);
    const [isSorted, setIsSorted] = useState(false);

    const sortedSongs = isSorted
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

    return (
        <>
            <PlaylistCreation
                artist={selectedArtist}
                userProfile={userProfile}
                playlistQueue={playlistQueue}
            />
            <div className="flex justify-between p-3">
                <div className="flex">
                    <Funnel onClick={() => setModalIsOpen((prev) => !prev)} />
                    {modalIsOpen && (
                        <FiltersModal
                            onCoversCheck={setShowCovers}
                            onModalClose={setModalIsOpen}
                            onSort={() => setIsSorted((prev) => !prev)}
                            showCovers={showCovers}
                            isSorted={isSorted}
                        />
                    )}
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
                {sortedSongs.map((song, index) => {
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

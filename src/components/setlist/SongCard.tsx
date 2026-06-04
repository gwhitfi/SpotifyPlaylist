import { useEffect, useState } from "react";
import { lastFMAlbumArtSearch } from "../../api/lastFMAlbumArtSearch";
import type { ParsedSong } from "../../utils/parseSetlist";

interface SongCardProps {
    song: ParsedSong;
    handleCheck: (songName: string, songArtist: string, isCover: boolean, checked: boolean) => void;
    selectAll: boolean;
}

export function SongCard({ song, handleCheck, selectAll }: SongCardProps) {
    const [albumArt, setAlbumArt] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const fetchArt = async () => {
            const artUrl = await lastFMAlbumArtSearch(song.artist, song.name);
            setAlbumArt(artUrl);
        };
        fetchArt();
    }, [song.name]);

    useEffect(() => {
        setIsChecked(selectAll);
        handleCheck(song.name, song.artist, song.isCover, selectAll);
    }, [selectAll]);

    return (
        <div className={`flex border border-neutral-50 p-2 rounded-xl w-full gap-3`}>
            {albumArt && <img className="rounded-xl" src={albumArt} alt="album-art" />}
            <div className="flex flex-col w-full items-start justify-around">
                <h2 className="text-sm md:text-xl overflow-hidden">
                    {song.isCover ? `${song.name} (cover)` : song.name}
                </h2>
                {song.isCover && <p className="text-sm">{song.artist}</p>}
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked);
                        handleCheck(song.name, song.artist, song.isCover, e.target.checked);
                    }}
                />
            </div>
        </div>
    );
}

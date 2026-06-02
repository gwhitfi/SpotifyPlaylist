import { useEffect, useState } from "react";
import { lastFMAlbumArtSearch } from "../api/lastFMAlbumArtSearch";

function SongCard({ song, handleCheck, selectAll, showCovers }: any) {
    const [albumArt, setAlbumArt] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const hidden = !showCovers && song.isCover && "hidden";

    useEffect(() => {
        const fetchArt = async () => {
            const artUrl = await lastFMAlbumArtSearch(song.artist, song.name);
            setAlbumArt(artUrl);
        };
        fetchArt();
    }, [song.name]);

    useEffect(() => {
        if (!hidden) {
            setIsChecked(selectAll);
            handleCheck(song.name, song.artist, selectAll);
        }
    }, [selectAll]);

    useEffect(() => {
        if (hidden) {
            setIsChecked(false);
            handleCheck(song.name, song.artist, false);
        }
    }, [showCovers]);
    return (
        <div className={`flex border border-neutral-50 gap-3 ${hidden}`}>
            <img className="" src={`${albumArt}`} alt="" />
            <div className="flex flex-col w-full items-start justify-between">
                <h2 className="text-xl">{song.isCover ? `${song.name} (cover)` : song.name}</h2>
                {song.isCover && <p className="text-sm">{song.artist}</p>}
            </div>
            <div className="flex align-center pr-5">
                <input
                    type="checkbox"
                    checked={hidden ? false : isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked);
                        handleCheck(song.name, song.artist, e.target.checked);
                    }}
                />
            </div>
        </div>
    );
}
export default SongCard;

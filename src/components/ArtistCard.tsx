import { useEffect, useState } from "react";
import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";
import { fanartTVArtSearch, type FanArtResponse } from "../api/fanartTVArtSearch";

interface ArtistCardProps {
    selectedArtist: MusicBrainzArtist;
}

export function ArtistCard({ selectedArtist }: ArtistCardProps) {
    const [artistArt, setArtistArt] = useState<FanArtResponse | null>(null);

    useEffect(() => {
        const fetchArt = async () => {
            const response = await fanartTVArtSearch(selectedArtist);
            setArtistArt(response);
        };
        fetchArt();
    }, [selectedArtist]);

    const profileImage =
        artistArt?.artistbackground?.[0]?.url ?? artistArt?.hdmusiclogo?.[0]?.url ?? "";

    return (
        <div className="flex flex-col items-center text-center bg-neutral-900 rounded-xl p-5 gap-2 lg:p-12">
            <h2 className="text-4xl">{selectedArtist.name}</h2>
            <p className="text-xs">{selectedArtist?.tags?.[0]?.name ?? ""}</p>
            {profileImage && (
                <img src={profileImage} alt="artist-image" className="w-48 rounded-xl" />
            )}
        </div>
    );
}

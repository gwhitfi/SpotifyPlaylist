import "../index.css";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SetlistCard } from "../components/SetlistCard";
import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";
import { ArtistCard } from "../components/ArtistCard";
import { NavBar } from "../components/NavBar";

export function Home() {
    const [selectedArtist, setSelectedArtist] = useState<MusicBrainzArtist | null>(null);

    return (
        <div className="bg-neutral-800  min-h-screen flex justify-center p-2">
            <div className="flex flex-col text-neutral-200 max-w-lg w-full gap-5 lg:max-w-2xl">
                <NavBar />
                <SearchBar setSelectedArtist={setSelectedArtist} />
                {selectedArtist && <ArtistCard selectedArtist={selectedArtist} />}
                {selectedArtist && <SetlistCard selectedArtist={selectedArtist} />}
            </div>
        </div>
    );
}

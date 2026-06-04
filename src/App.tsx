import "./index.css";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { SetlistCard } from "./components/SetlistCard";
import { SpotifyLogIn } from "./components/SpotifyLogIn";
import type { MusicBrainzArtist } from "./api/musicBrainzArtistSearch";
import { ArtistCard } from "./components/ArtistCard";

function App() {
    const [selectedArtist, setSelectedArtist] = useState<MusicBrainzArtist | null>(null);

    return (
        <div className="bg-neutral-800  min-h-screen flex justify-center p-2">
            <div className="flex flex-col text-neutral-200 max-w-lg w-full gap-5">
                <a href="/">
                    <h1 className="text-4xl text-center p-2">Setlists &rarr; Playlist</h1>
                </a>
                <SpotifyLogIn />
                <SearchBar setSelectedArtist={setSelectedArtist} />
                {selectedArtist && <ArtistCard selectedArtist={selectedArtist} />}
                {selectedArtist && <SetlistCard selectedArtist={selectedArtist} />}
            </div>
        </div>
    );
}

export default App;

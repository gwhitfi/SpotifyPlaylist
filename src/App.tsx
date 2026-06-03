import "./index.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SetlistCard from "./components/SetlistCard";
import SpotifyLogIn from "./components/SpotifyLogIn";
import ArtistCard from "./components/ArtistCard";
import type { MusicBrainzArtist } from "./api/musicBrainzArtistSearch";

function App() {
    const [selectedArtist, setSelectedArtist] = useState<MusicBrainzArtist | null>(null);

    return (
        <div className="bg-neutral-800  min-h-screen flex justify-center">
            <div className="flex flex-col text-neutral-200 max-w-lg w-full">
                <h1 className="text-3xl text-center p-2">Setlists &rarr; Playlist</h1>
                <SpotifyLogIn />
                <SearchBar onArtistSelect={setSelectedArtist} />
                {selectedArtist && <ArtistCard selectedArtist={selectedArtist} />}
                {selectedArtist && <SetlistCard selectedArtist={selectedArtist} />}
            </div>
        </div>
    );
}

export default App;

import "./index.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SetlistCard from "./components/SetlistCard";
import SpotifyLogIn from "./components/SpotifyLogIn";

function App() {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);

    return (
        <div className="bg-neutral-800 text-neutral-200 min-h-screen">
            <h1 className="text-3xl text-center p-2">Setlists &rarr; Playlist</h1>
            <SpotifyLogIn />
            <SearchBar onArtistSelect={setSelectedArtist} />
            {selectedArtist && <SetlistCard selectedArtist={selectedArtist} />}
        </div>
    );
}

export default App;

import "./index.css";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import { setlistFMSearch } from "./api/setlistFMSearch";
import SetlistCard from "./components/SetlistCard";
import SpotifyLogIn from "./components/SpotifyLogIn";
import { getToken } from "./api/spotifyAuth";
import { getSpotifyProfile } from "./utils/getSpotifyProfile";

function App() {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);
    const [artistSetlist, setArtistSetlist] = useState<any>(null);
    const [spotifyProfile, setSpotifyProfile] = useState<any>();
    const exchangedRef = useRef(false);
    useEffect(() => {
        if (!selectedArtist) return;
        setlistFMSearch(selectedArtist.id).then(setArtistSetlist).catch(console.error);
    }, [selectedArtist]);

    useEffect(() => {
        if (exchangedRef.current) return;
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            exchangedRef.current = true;
            getToken().then(() => {
                window.history.replaceState({}, "", "/");
            });
        } else if (localStorage.getItem("access_token")) {
            getSpotifyProfile().then(setSpotifyProfile);
        }
    }, []);

    return (
        <div className="bg-neutral-800 text-neutral-200 min-h-screen">
            <h1 className="text-3xl text-center p-2">Setlists &rarr; Playlist</h1>
            <SpotifyLogIn profile={spotifyProfile} />
            <SearchBar onArtistSelect={setSelectedArtist} />
            {artistSetlist && (
                <SetlistCard
                    artistSetlist={artistSetlist}
                    selectedArtist={selectedArtist}
                    userProfile={spotifyProfile}
                />
            )}
        </div>
    );
}

export default App;

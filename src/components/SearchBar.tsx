import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { musicBrainzArtistSearch } from "../api/musicBrainzArtistSearch";
import { getCountryName } from "../utils/getCountryName";

function SearchBar({ onArtistSelect }: any) {
    const [input, setInput] = useState("");
    const [debouncedArtists, setDebouncedArtists] = useState<any[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (input) {
                try {
                    const response = (await musicBrainzArtistSearch(input)) as any;
                    if (!response) return;
                    const validArtists = response.artists.filter(
                        (artist: any) => artist.score >= 90,
                    );
                    setDebouncedArtists(validArtists);
                } catch (error) {
                    console.error("ERROR Setting Artist: ", error);
                }
            } else {
                setDebouncedArtists([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div className="flex flex-col w-full p-3">
            <div className="flex border-2 border-neutral-200 rounded-t-xl p-1">
                <input
                    value={input}
                    className="w-full text-xl outline-none"
                    name="search"
                    placeholder="Search for an artist"
                    autoComplete="off"
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <span>
                    <Search />
                </span>
            </div>
            <div className="flex flex-col px-5 text-xl border-x-2 border-b-2 border-neutral-200 rounded-b-xl  overflow-hidden">
                {debouncedArtists &&
                    debouncedArtists.map((result, index) => {
                        const name = result.name ? result.name : "Unknown Artist";
                        const countryOfOrigin = getCountryName(result.country)
                            ? `- ${getCountryName(result.country)}`
                            : "";
                        const yearFormed = result["life-span"].begin
                            ? `(${result["life-span"].begin.split("-")[0]})`
                            : "";
                        return (
                            <div
                                className="-mx-5 px-5 py-2 border-t-0 truncate whitespace-nowrap hover:bg-violet-500 hover:text-neutral-50 hover:cursor-pointer hover:font-bold"
                                key={index}
                                onMouseDown={() => {
                                    console.log("ARTIST: ", result);
                                    onArtistSelect(result);
                                    setDebouncedArtists([]);
                                    setInput("");
                                }}
                            >
                                {name} {countryOfOrigin} {`${yearFormed}`}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default SearchBar;

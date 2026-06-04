import { Search } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { musicBrainzArtistSearch } from "../api/musicBrainzArtistSearch";
import { getCountryName } from "../utils/getCountryName";
import type { MusicBrainzArtist } from "../api/musicBrainzArtistSearch";

interface SearchBarProps {
    setSelectedArtist: Dispatch<SetStateAction<MusicBrainzArtist | null>>;
}
function SearchBar({ setSelectedArtist }: SearchBarProps) {
    const [input, setInput] = useState("");
    const [debouncedArtists, setDebouncedArtists] = useState<MusicBrainzArtist[]>([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (input) {
                try {
                    const response = await musicBrainzArtistSearch(input);
                    if (!response) return;
                    const validArtists = response.filter(
                        (artist: MusicBrainzArtist) => artist.score >= 90,
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
                        const name = result.name ?? "Unknown Artist";
                        const countryOfOrigin = result?.country
                            ? getCountryName(result.country)
                            : "";
                        const yearFormed = result?.["life-span"]?.begin?.split("-")[0] ?? "";
                        return (
                            <div
                                className="-mx-5 px-5 py-2 border-t-0 truncate whitespace-nowrap hover:bg-violet-500 hover:text-neutral-50 hover:cursor-pointer hover:font-bold"
                                key={index}
                                onMouseDown={() => {
                                    setSelectedArtist(result);
                                    setDebouncedArtists([]);
                                    setInput("");
                                }}
                            >
                                {name} - {countryOfOrigin} {`${yearFormed}`}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default SearchBar;

import type { Setlist, Set, Song } from "../api/setlistFMSearch";

export interface ParsedSong {
    name: string;
    isCover: boolean;
    artist: string;
}

export function parseSetlist(setlist: Setlist[]) {
    const songsMap = new Map<string, ParsedSong>();

    setlist.map((setlist: Setlist) => {
        setlist.sets.set.map((set: Set) => {
            set.song.map((song: Song) => {
                const cover = song.cover ? true : false;
                const artistName = song.cover?.name ?? setlist.artist.name;
                if (!songsMap.has(song.name)) {
                    songsMap.set(song.name, {
                        name: song.name,
                        isCover: cover,
                        artist: artistName,
                    });
                }
            });
        });
    });
    return songsMap;
}

export function parseSetlist(setlist: any) {
    const songsMap = new Map<string, any>();

    setlist.map((setlist: any) => {
        setlist.sets.set.map((set: any) => {
            set.song.map((song: any) => {
                const cover = song.cover ? true : false;
                const artistName = song.cover ? song.cover.name : setlist.artist.name;
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

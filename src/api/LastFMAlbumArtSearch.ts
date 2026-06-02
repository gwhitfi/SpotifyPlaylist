const PLACEHOLDER =
    "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png";

export async function LastFMAlbumArtSearch(artistName: string, songName: string) {
    try {
        const response = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&artist=${artistName}&track=${songName}&format=json`,
        );

        const data = await response.json();

        if (!data.track) {
            if (artistName.includes("&")) {
                return LastFMAlbumArtSearch(artistName.replace("&", "and"), songName);
            }
            if (songName.includes("&")) {
                return LastFMAlbumArtSearch(artistName, songName.replace("&", "and"));
            }
            return PLACEHOLDER;
        }

        const artUrl = data.track.album.image[1]["#text"] || PLACEHOLDER;
        return artUrl;
    } catch (error) {
        console.error(error);
        return PLACEHOLDER;
    }
}

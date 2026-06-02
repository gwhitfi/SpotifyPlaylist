export async function MusicBrainzArtistSearch(input: string) {
    const URL = `https://musicbrainz.org/ws/2/artist?query=artist:${input}&fmt=json`;
    try {
        const response = await fetch(`${URL}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

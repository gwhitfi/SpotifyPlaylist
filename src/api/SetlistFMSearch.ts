export async function SetlistFMSearch(selectedArtist: any) {
    try {
        console.log("SETLIST FOR:", selectedArtist);
        const response = await fetch(`/setlist/rest/1.0/artist/${selectedArtist}/setlists`, {
            headers: {
                "x-api-key": import.meta.env.VITE_SETLIST_API_KEY,
                Accept: "application/json",
            },
        });

        const data = await response.json();
        return data.setlist ?? [];
    } catch (error) {
        console.error(error);
        return null;
    }
}

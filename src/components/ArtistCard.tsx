function ArtistCard({ selectedArtist, artistImages }: any) {
    return (
        <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl py-1">{selectedArtist.name}</h2>
            <p className="pb-1">{selectedArtist.tags[0].name}</p>
            <img
                src={`${artistImages?.artistbackground[0]?.url}`}
                alt="artist-image"
                className="w-36"
            />
        </div>
    );
}

export default ArtistCard;

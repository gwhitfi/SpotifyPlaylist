function FiltersModal({ onCoversCheck, onSort, showCovers, isSorted }: any) {
    const filterSelected = "bg-violet-500 text-white";
    const filterUnselected = "bg-neutral-200 text-neutral-900";
    return (
        <div className="">
            <button
                className={`px-3 py-1 rounded-full ${showCovers ? filterSelected : filterUnselected}`}
                onClick={() => onCoversCheck((prev: any) => !prev)}
            >
                Cover Songs
            </button>

            <button
                className={`px-3 py-1 rounded-full ${isSorted ? filterSelected : filterUnselected}`}
                onClick={onSort}
            >
                Sort A-Z
            </button>
        </div>
    );
}

export default FiltersModal;

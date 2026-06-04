import { Button } from "./Button";
import type { SortState } from "./SetlistCard";
interface FiltersModalProps {
    showCovers: () => void;
    isSorted: () => void;
    isHidden: boolean;
    sortState: SortState;
}
function FiltersModal({ showCovers, isSorted, isHidden, sortState }: FiltersModalProps) {
    const hidden = isHidden ? "" : "hidden";
    const sortLabel: Record<SortState, string> = {
        default: "Sort A->Z",
        asc: "Sort Z-A",
        desc: "Clear Sort",
    };
    return (
        <div className={`${hidden}`}>
            <Button
                buttonLabel="Cover Songs"
                color="violet"
                defaultStatus={true}
                onClick={showCovers}
            />
            <Button
                buttonLabel={sortLabel[sortState]}
                color="violet"
                defaultStatus={false}
                onClick={isSorted}
            />
        </div>
    );
}

export default FiltersModal;

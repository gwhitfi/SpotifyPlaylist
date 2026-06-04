import { Button } from "./Button";
import type { SortState } from "./SetlistCard";

interface FilterPanelProps {
    onToggleCovers: () => void;
    onSort: () => void;
    isOpen: boolean;
    sortState: SortState;
    coversActive: boolean;
}

export function FilterPanel({
    onToggleCovers,
    onSort,
    isOpen,
    sortState,
    coversActive,
}: FilterPanelProps) {
    const hidden = isOpen ? "" : "hidden";
    const sortLabel: Record<SortState, string> = {
        default: "Sort by Name",
        asc: "Name: A->Z",
        desc: "Name: Z->A",
    };
    return (
        <div className={`${hidden}`}>
            <Button
                buttonLabel="Cover Songs"
                color="violet"
                isActive={coversActive}
                onClick={onToggleCovers}
            />
            <Button
                buttonLabel={sortLabel[sortState]}
                color="violet"
                isActive={sortState !== "default"}
                onClick={onSort}
            />
        </div>
    );
}

import { SetlistFilterButton } from "./SetlistFilterButton";
import type { SortState } from "./SetlistCard";

interface SetlistFilterPanelProps {
    onToggleCovers: () => void;
    onSort: () => void;
    onSelectAll: () => void;
    sortState: SortState;
    coversActive: boolean;
    selectAll: boolean;
}

export function SetlistFilterPanel({
    onToggleCovers,
    onSort,
    onSelectAll,
    sortState,
    coversActive,
    selectAll,
}: SetlistFilterPanelProps) {
    const sortLabel: Record<SortState, string> = {
        default: "Sort by Name",
        asc: "Name: A->Z",
        desc: "Name: Z->A",
    };
    return (
        <div className="flex flex-wrap gap-1 justify-center">
            <SetlistFilterButton
                buttonLabel="Cover Songs"
                isActive={coversActive}
                onClick={onToggleCovers}
            />
            <SetlistFilterButton
                buttonLabel={sortLabel[sortState]}
                isActive={sortState !== "default"}
                onClick={onSort}
            />
            <SetlistFilterButton
                buttonLabel="Select All"
                onClick={onSelectAll}
                isActive={selectAll}
            />
        </div>
    );
}

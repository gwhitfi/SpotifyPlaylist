import { Button } from "./Button";
import type { SortState } from "./SetlistCard";

interface FilterPanelProps {
    onToggleCovers: () => void;
    onSort: () => void;
    onSelectAll: () => void;
    sortState: SortState;
    coversActive: boolean;
    selectAll: boolean;
}

export function FilterPanel({
    onToggleCovers,
    onSort,
    onSelectAll,
    sortState,
    coversActive,
    selectAll,
}: FilterPanelProps) {
    const sortLabel: Record<SortState, string> = {
        default: "Sort by Name",
        asc: "Name: A->Z",
        desc: "Name: Z->A",
    };
    return (
        <div className="flex flex-wrap gap-1 justify-center">
            <Button buttonLabel="Cover Songs" isActive={coversActive} onClick={onToggleCovers} />
            <Button
                buttonLabel={sortLabel[sortState]}
                isActive={sortState !== "default"}
                onClick={onSort}
            />
            <Button buttonLabel="Select All" onClick={onSelectAll} isActive={selectAll} />
        </div>
    );
}

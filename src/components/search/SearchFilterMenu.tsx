import { Wrench } from "lucide-react";
import { MenuButton } from "../common/MenuButton";
import { useState } from "react";

export function SearchFilterMenu() {
    const [dummy, setDummy] = useState(false);
    return (
        <div className="absolute top-full bg-neutral-900 w-full z-10 border border-neutral-700 p-2 rounded-xl text-center">
            <MenuButton
                icon={Wrench}
                onClick={() => setDummy((prev) => !prev)}
                text="Search by Setlist.FM setlist link"
                title="Submit a valid Last.FM setlist URL into the search bar"
            />
            <MenuButton
                icon={Wrench}
                onClick={() => setDummy((prev) => !prev)}
                text="Strict Search Mode"
            />
        </div>
    );
}

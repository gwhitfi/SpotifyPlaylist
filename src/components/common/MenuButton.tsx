import type { LucideIcon } from "lucide-react";
interface MenuButton {
    onClick: () => void;
    icon: LucideIcon;
    text: string;
    title?: string;
}

export function MenuButton({ onClick, icon: Icon, text, title }: MenuButton) {
    return (
        <button
            className="flex gap-2 bg-neutral-900 hover:bg-neutral-800 w-full p-2 rounded-xl cursor-pointer"
            onClick={onClick}
            title={title}
        >
            <Icon /> {text}
        </button>
    );
}

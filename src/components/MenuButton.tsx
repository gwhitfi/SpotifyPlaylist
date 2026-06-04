import type { LucideIcon } from "lucide-react";
interface MenuButtonProps {
    onClick: () => void;
    icon: LucideIcon;
    text: string;
}

export function MenuButton({ onClick, icon: Icon, text }: MenuButtonProps) {
    return (
        <button
            className="flex gap-2 bg-neutral-900 hover:bg-neutral-800 w-full p-2 rounded-xl cursor-pointer"
            onClick={onClick}
        >
            <Icon /> {text}
        </button>
    );
}

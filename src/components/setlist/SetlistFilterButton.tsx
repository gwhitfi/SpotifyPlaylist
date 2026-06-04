interface SetlistFilterButtonProps {
    buttonLabel: string;
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export function SetlistFilterButton({
    buttonLabel,
    onClick,
    isActive,
    disabled,
}: SetlistFilterButtonProps) {
    const buttonColors = isActive
        ? `bg-violet-500 hover:bg-violet-400 text-neutral-900`
        : `bg-neutral-200 hover:bg-violet-400 text-neutral-900`;

    return (
        <button
            className={`min-w-36 text-center px-3 py-1 rounded-full ${buttonColors} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
            onClick={onClick}
            type="button"
            disabled={disabled}
        >
            {buttonLabel}
        </button>
    );
}

interface ButtonProps {
    buttonLabel: string;
    color: "green" | "violet";
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
}

export function Button({ buttonLabel, color, onClick, isActive, disabled }: ButtonProps) {
    const buttonColors = isActive
        ? {
              green: `bg-green-500 hover:bg-green-400 text-neutral-900`,
              violet: `bg-violet-500 hover:bg-violet-400 text-neutral-900`,
          }
        : {
              green: `bg-neutral-200 hover:bg-green-400 text-neutral-900`,
              violet: `bg-neutral-200 hover:bg-violet-400 text-neutral-900`,
          };

    return (
        <button
            className={`px-3 py-1 rounded-full ${buttonColors[color]} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
            onClick={onClick}
            type="button"
            disabled={disabled}
        >
            {buttonLabel}
        </button>
    );
}

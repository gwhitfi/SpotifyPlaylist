import { useState } from "react";

interface ButtonProps {
    buttonLabel: string;
    color: "green" | "violet";
    defaultStatus: boolean;
    onClick: () => void;
    isActive?: () => void;
}

export function Button({ buttonLabel, color, defaultStatus, onClick, isActive }: ButtonProps) {
    const [isClicked, setIsClicked] = useState(defaultStatus);

    const buttonColors = isClicked
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
            className={`px-3 py-1 rounded-full hover:cursor-pointer ${buttonColors[color]}`}
            onClick={() => {
                onClick();
                setIsClicked((prev) => !prev);
                isActive;
            }}
        >
            {buttonLabel}
        </button>
    );
}

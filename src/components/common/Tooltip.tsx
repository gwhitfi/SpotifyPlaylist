interface TooltipProps {
    text: string;
}

export function Tooltip({ text }: TooltipProps) {
    return (
        <div className="absolute top-full bg-neutral-900 w-42 z-10 border border-neutral-700 p-2 rounded-xl text-center">
            <p>{text}</p>
        </div>
    );
}

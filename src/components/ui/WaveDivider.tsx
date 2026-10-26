
export function WaveDivider({ 
    color, 
    position = 'top', 
    className = '' 
}: { 
    color: string, 
    position?: 'top' | 'bottom', 
    className?: string 
}) {
    return (
        <div 
            className={`absolute left-0 w-full h-[60px] md:h-[100px] overflow-hidden leading-none z-10 pointer-events-none ${
                position === 'top' ? 'top-[-1px] rotate-180' : 'bottom-[-1px]'
            } ${className}`}
        >
            <svg 
                className="relative w-full h-full" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 24 150 28" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
            >
                <defs>
                    <path id={`gentle-wave-${position}`} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g>
                    <use href={`#gentle-wave-${position}`} x="48" y="0" fill={color} />
                </g>
            </svg>
        </div>
    )
}

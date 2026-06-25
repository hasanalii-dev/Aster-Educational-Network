
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
                <g className="parallax-waves">
                    <use href={`#gentle-wave-${position}`} x="48" y="0" fill={color} opacity="0.7" />
                    <use href={`#gentle-wave-${position}`} x="48" y="3" fill={color} opacity="0.5" />
                    <use href={`#gentle-wave-${position}`} x="48" y="5" fill={color} opacity="0.3" />
                    <use href={`#gentle-wave-${position}`} x="48" y="7" fill={color} />
                </g>
            </svg>
            <style dangerouslySetInnerHTML={{__html: `
                .parallax-waves > use { animation: wave-move 25s cubic-bezier(.55,.5,.45,.5) infinite; }
                .parallax-waves > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
                .parallax-waves > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
                .parallax-waves > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
                .parallax-waves > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }
                @keyframes wave-move { 0% { transform: translate3d(-90px, 0, 0); } 100% { transform: translate3d(85px, 0, 0); } }
            `}} />
        </div>
    )
}

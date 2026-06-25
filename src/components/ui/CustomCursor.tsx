import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type CursorState = 'default' | 'hover' | 'text' | 'image' | 'scroll' | 'selection' | 'grab' | 'grabbing' | 'indicator' | 'video'

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const [cursorState, setCursorState] = useState<CursorState>('default')
    const [cursorTheme, setCursorTheme] = useState<'light' | 'dark'>('light')
    const stateRef = useRef<CursorState>('default')
    const [bgImage, setBgImage] = useState<string | null>(null)
    const [videoPlaying, setVideoPlaying] = useState(false)
    
    useEffect(() => {
        stateRef.current = cursorState
    }, [cursorState])

    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    // Track exact mouse position to allow instant target detection during scroll
    const lastPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return

        const cursor = cursorRef.current
        const imgContainer = imageContainerRef.current
        const indicator = indicatorRef.current
        if (!cursor || !imgContainer || !indicator) return

        gsap.set(cursor, { xPercent: -50, yPercent: -50 })
        gsap.set(imgContainer, { xPercent: -50, yPercent: -50 })

        // Super reactive, near-zero latency trailing (duration lowered to 0.05)
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" })
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" })
        
        const imgXTo = gsap.quickTo(imgContainer, "x", { duration: 0.2, ease: "power3.out" })
        const imgYTo = gsap.quickTo(imgContainer, "y", { duration: 0.2, ease: "power3.out" })

        const updateStateFromTarget = (target: HTMLElement | null) => {
            if (!target) return

            const section = target.closest('section, footer, header, [data-cursor-theme]') as HTMLElement
            if (section) {
                const explicitTheme = section.getAttribute('data-cursor-theme')
                if (explicitTheme === 'dark' || explicitTheme === 'light') {
                    setCursorTheme(explicitTheme)
                } else {
                    const bg = window.getComputedStyle(section).backgroundColor
                    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
                    if (match) {
                        const [, r, g, b] = match.map(Number)
                        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
                        setCursorTheme(luminance < 0.45 ? 'dark' : 'light')
                    } else {
                        setCursorTheme('light')
                    }
                }
            }

            const selection = window.getSelection()
            if (selection && selection.toString().length > 0) {
                setCursorState('selection')
                return
            }

            const imageEl = target.closest('[data-cursor-image]') as HTMLElement
            if (imageEl) {
                setBgImage(imageEl.dataset.cursorImage || null)
                setCursorState('image')
                return
            }

            const videoEl = target.closest('video, [data-cursor-video]') as HTMLVideoElement
            if (videoEl) {
                setCursorState('video')
                setVideoPlaying(!videoEl.paused)
                return
            }

            const grabEl = target.closest('[data-cursor-grab]') as HTMLElement
            if (grabEl) {
                if (grabEl.dataset.cursorGrab === 'active') {
                    setCursorState('grabbing')
                } else {
                    setCursorState('grab')
                }
                return
            }

            const scrollEl = target.closest('[data-cursor-scroll]') as HTMLElement
            if (scrollEl) {
                setCursorState('indicator')
                return
            }

            if (target.closest('a, button, [role="button"]')) {
                setCursorState('hover')
                return
            }

            if (target.closest('input, textarea, [contenteditable="true"]')) {
                setCursorState('text')
                return
            }

            setCursorState('default')
            setBgImage(null)
        }

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
            imgXTo(e.clientX)
            imgYTo(e.clientY)
            lastPos.current = { x: e.clientX, y: e.clientY }

            // Instantly react to the target under the mouse
            updateStateFromTarget(e.target as HTMLElement)
        }

        const onScroll = () => {
            // Find exactly what is under the mouse right now (even if the mouse hasn't moved)
            const el = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement
            if (el) {
                updateStateFromTarget(el)
            }

            if (stateRef.current === 'default' || stateRef.current === 'scroll') {
                setCursorState('scroll')
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
                scrollTimeout.current = setTimeout(() => {
                    if (stateRef.current === 'scroll') {
                        // After scroll ends, re-evaluate again to be perfectly safe
                        const currentEl = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement
                        if (currentEl) {
                            updateStateFromTarget(currentEl)
                        } else {
                            setCursorState('default')
                        }
                    }
                }, 60)
            }
        }

        const handleSelectionChange = () => {
            const selection = window.getSelection()
            if (selection && selection.toString().length > 0) {
                setCursorState('selection')
            } else {
                const el = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement
                if (el) updateStateFromTarget(el)
            }
        }

        const handleMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const grabEl = target.closest('[data-cursor-grab]') as HTMLElement
            if (grabEl) setCursorState('grabbing')
        }

        const handleMouseUp = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const grabEl = target.closest('[data-cursor-grab]') as HTMLElement
            if (grabEl) setCursorState('grab')
            else updateStateFromTarget(target)
        }

        const handleClick = (e: MouseEvent) => {
            // Animate cursor instantly on click to match the spark effect
            gsap.fromTo(cursor, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.3)", overwrite: "auto" })

            const target = e.target as HTMLElement
            const videoEl = target.closest('video, [data-cursor-video]') as HTMLVideoElement
            if (videoEl && typeof videoEl.play === 'function') {
                if (videoEl.paused) {
                    videoEl.play()
                    setVideoPlaying(true)
                } else {
                    videoEl.pause()
                    setVideoPlaying(false)
                }
            }
        }

        window.addEventListener('mousemove', onMouseMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('selectionchange', handleSelectionChange, { passive: true })
        document.addEventListener('mousedown', handleMouseDown, { passive: true })
        document.addEventListener('mouseup', handleMouseUp, { passive: true })
        document.addEventListener('click', handleClick, { passive: true })

        // Initial check in case cursor spawns over a special element
        const initialEl = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement
        if (initialEl) updateStateFromTarget(initialEl)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('selectionchange', handleSelectionChange)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('click', handleClick)
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        }
    }, [])

    useEffect(() => {
        const cursor = cursorRef.current
        const imgContainer = imageContainerRef.current
        const indicator = indicatorRef.current
        if (!cursor || !imgContainer || !indicator) return

        const mainColor = cursorTheme === 'dark' ? '#FFC51B' : '#394EA2'
        const mainColorAlpha = cursorTheme === 'dark' ? 'rgba(255, 197, 27, 0.4)' : 'rgba(57, 78, 162, 0.4)'
        const mainColorLight = cursorTheme === 'dark' ? 'rgba(255, 197, 27, 0.1)' : 'rgba(57, 78, 162, 0.1)'
        const indicatorColor = cursorTheme === 'dark' ? '#050B14' : '#FFFFFF'

        // Lightning fast state transitions
        const dur = 0.15

        switch (cursorState) {
            case 'default':
                gsap.to(cursor, { width: 16, height: 16, borderRadius: '50%', backgroundColor: mainColorAlpha, border: `2px solid ${mainColor}`, scale: 1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 0, scale: 0, duration: dur })
                break;
            case 'hover':
                gsap.to(cursor, { width: 64, height: 64, borderRadius: '0%', backgroundColor: 'transparent', border: 'none', scale: 1, rotation: 90, duration: 0.2, ease: "back.out(1.5)" })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 1, scale: 1, duration: dur })
                if (indicator) indicator.innerHTML = `<svg width="64" height="64" viewBox="0 0 24 24" fill="${mainColor}"><path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"/></svg>`
                break;
            case 'text':
                gsap.to(cursor, { width: 4, height: 32, borderRadius: '2px', backgroundColor: mainColor, border: 'none', scale: 1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 0, scale: 0, duration: dur })
                break;
            case 'scroll':
                gsap.to(cursor, { width: 24, height: 24, borderRadius: '50%', backgroundColor: mainColorLight, border: `3px solid ${mainColor}`, scale: 1.1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 0, scale: 0, duration: dur })
                break;
            case 'selection':
                gsap.to(cursor, { width: 40, height: 40, borderRadius: '4px', backgroundColor: 'transparent', border: `2px dashed ${mainColor}`, scale: 1.1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 0, scale: 0, duration: dur })
                break;
            case 'grab':
                gsap.to(cursor, { width: 60, height: 60, borderRadius: '50%', backgroundColor: mainColor, border: 'none', scale: 1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 1, scale: 1, duration: dur })
                if (indicator) indicator.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${indicatorColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M12 5l-4 4M12 5l4 4M12 19l-4-4M12 19l4-4"/></svg>`
                break;
            case 'grabbing':
                gsap.to(cursor, { width: 50, height: 50, borderRadius: '50%', backgroundColor: mainColor, border: 'none', scale: 0.9, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 1, scale: 0.9, duration: dur })
                if (indicator) indicator.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${indicatorColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M12 5l-4 4M12 5l4 4M12 19l-4-4M12 19l4-4"/></svg>`
                break;
            case 'indicator':
                gsap.to(cursor, { width: 70, height: 70, borderRadius: '50%', backgroundColor: mainColor, border: 'none', scale: 1, rotation: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 1, scale: 1, duration: dur })
                if (indicator) indicator.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${indicatorColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>`
                break;
            case 'video':
                gsap.to(cursor, { width: 90, height: 60, borderRadius: '30px', backgroundColor: mainColor, border: 'none', scale: 1, rotation: 0, duration: 0.2, ease: "back.out(2)" })
                gsap.to(imgContainer, { opacity: 0, scale: 0.5, duration: dur })
                gsap.to(indicator, { opacity: 1, scale: 1, duration: dur })
                // Custom Pause or Play Icon Based on State
                const iconPath = videoPlaying 
                    ? `<path d="M12 10h5v20h-5zM23 10h5v20h-5z"/>` // Pause Icon
                    : `<path d="M14 10l16 10-16 10V10z"/>` // Play Icon
                if (indicator) indicator.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="${indicatorColor}">${iconPath}</svg>`
                break;
            case 'image':
                gsap.to(cursor, { opacity: 0, scale: 0, duration: dur })
                gsap.to(indicator, { opacity: 0, scale: 0, duration: dur })
                gsap.to(imgContainer, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" })
                break;
        }

        if (cursorState !== 'image') {
            gsap.to(cursor, { opacity: 1, duration: dur, overwrite: 'auto' })
        }
    }, [cursorState, cursorTheme, videoPlaying])

    return (
        <>
            <style>{`
                .trailing-cursor-base {
                    position: fixed;
                    top: 0; left: 0;
                    pointer-events: none;
                    z-index: 999999;
                    will-change: width, height, transform, opacity;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .cursor-image-reveal {
                    position: fixed;
                    top: 0; left: 0;
                    width: 200px;
                    height: 140px;
                    pointer-events: none;
                    z-index: 999998;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    will-change: transform, opacity;
                }

                .cursor-image-reveal img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .cursor-indicator {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    pointer-events: none;
                    will-change: opacity, transform;
                }
                
                @media (pointer: coarse) {
                    .trailing-cursor-base, .cursor-image-reveal { display: none !important; }
                }
            `}</style>

            <div ref={cursorRef} className="trailing-cursor-base">
                <div ref={indicatorRef} className="cursor-indicator" />
            </div>
            
            <div ref={imageContainerRef} className="cursor-image-reveal">
                {bgImage && <img src={bgImage} alt="" />}
            </div>
        </>
    )
}

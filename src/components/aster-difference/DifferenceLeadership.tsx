import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FolderImage = ({ src, alt }: { src: string, alt: string }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            {!loaded && <div className="absolute inset-0 bg-[#E2E8F0]/20 animate-pulse rounded-lg z-0" />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover rounded-lg relative z-10 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </>
    )
}

const ModalImage = ({ src, alt }: { src: string, alt: string }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <div className="relative max-h-[85vh] max-w-full w-auto aspect-[9/16] rounded-2xl shadow-2xl border-4 border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
            {!loaded && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    )
}

export function DifferenceLeadership() {
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    // ── Modal & Mobile State Engine ──
    const [modalOpen, setModalOpen] = useState(false)
    const [activeFolder, setActiveFolder] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const [openFolder, setOpenFolder] = useState<number | null>(null) // Mobile Tap State

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Folder Deal Animation
            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        }
                    }
                )
            }

            // 2. Mechanical Typesetting Scrub (Footer)
            const words = gsap.utils.toArray<HTMLElement>('.gsap-scrub-word')
            if (words.length > 0) {
                gsap.fromTo(
                    words,
                    { opacity: 0.2, y: 4 }, // Ghosted blue state
                    {
                        opacity: 1,
                        y: 0, // Physically locks into place
                        stagger: 0.1,
                        ease: 'power1.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 90%',
                            end: 'bottom 75%',
                            scrub: 1.5,
                        }
                    }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // Folder Payload Mapping
    const folderData = [
        {
            title: "Passion Projects",
            desc: "Students explore topics they genuinely care about and learn how to transform ideas into meaningful outcomes.",
            frontColor: "bg-[#e97f7b]",
            backColor: "bg-[#cf6562]",
            textColor: "text-white",
            iconBg: "bg-white/20 text-white",
            icon: <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>,
            images: [
                "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
            ]
        },
        {
            title: "Star Bites",
            desc: "Our student-led canteen initiative where students gain firsthand exposure to entrepreneurship, teamwork, financial literacy, and responsibility.",
            frontColor: "bg-[#6ab39d]",
            backColor: "bg-[#52937e]",
            textColor: "text-white",
            iconBg: "bg-white/20 text-white",
            icon: <><path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/></>,
            images: [
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
            ]
        },
        {
            title: "Aster Fundraiser",
            desc: "Students plan, market, manage, and operate fundraising stalls while supporting charitable causes, learning that leadership is most powerful when it creates value for others.",
            frontColor: "bg-[#ffc715]",
            backColor: "bg-[#d9a400]",
            textColor: "text-[#334a89]",
            iconBg: "bg-[#334a89]/10 text-[#334a89]",
            icon: <><path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/><path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.669zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/><path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/><path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/></>,
            images: [
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop"
            ]
        }
    ]

    // ── Modal Interaction Handlers ──
    const toggleFolder = (i: number) => {
        // Mobile tap logic: open the folder. If already open, close it.
        setOpenFolder(openFolder === i ? null : i)
    }

    const handleImageClick = (folderIdx: number, imgIdx: number, e: React.MouseEvent) => {
        e.stopPropagation() // Prevents folder from toggling shut when an image is clicked
        setActiveFolder(folderIdx)
        setActiveImage(imgIdx)
        setModalOpen(true)
        document.body.style.overflow = 'hidden' // Lock background scroll
    }

    const handleClose = () => {
        setModalOpen(false)
        document.body.style.overflow = 'auto'
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveImage((prev) => (prev + 1) % folderData[activeFolder].images.length)
    }

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveImage((prev) => (prev - 1 + folderData[activeFolder].images.length) % folderData[activeFolder].images.length)
    }

    const footerText = "These experiences help students develop initiative, confidence, creativity, and the ability to turn ideas into action. At Aster, we believe that future leaders learn by leading and we provide them the ground to do so."

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-white select-none overflow-hidden relative">
            <div className="max-w-[1360px] mx-auto">

                {/* =========================================================
            TOP SECTION: INTRO & THESIS
        ========================================================= */}
                <div className="text-center max-w-3xl mx-auto mb-28">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ffc715]">
                            <rect x="12" y="4" width="8" height="8" fill="currentColor" />
                            <rect x="4" y="12" width="8" height="8" fill="currentColor" />
                            <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                        </svg>
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#334a89] !text-[#334a89] uppercase mt-0.5">
              LEADERSHIP & OWNERSHIP
            </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#334a89] !text-[#334a89] mb-8">
                        Learning by Doing
                    </h2>

                    <div className="w-16 h-[2px] bg-[#ffc715] mx-auto mb-10" />

                    <p className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-[#5C5C61] !text-[#5C5C61] leading-[1.65] font-medium">
                        Some of the most important lessons cannot be taught through textbooks alone. At Aster, students are given meaningful opportunities to take ownership of their ideas, decisions, and learning experiences.
                    </p>
                </div>

                {/* =========================================================
            MIDDLE SECTION: THE 3D OS FOLDER SPREAD (3:4 POP-OUT)
        ========================================================= */}
                <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12 mb-32 max-w-6xl mx-auto">
                    {folderData.map((folder, i) => (

                        <div
                            key={i}
                            onClick={() => toggleFolder(i)}
                            // The z-index dynamically shifts to z-50 to prevent clipping during pop-out.
                            // group-[.is-open] handles the mobile touch state securely.
                            className={`group relative pt-14 flex flex-col h-full w-full max-w-sm mx-auto lg:max-w-none cursor-pointer transition-all duration-300 ${openFolder === i ? 'is-open z-50' : 'z-10 hover:z-50'}`}
                        >

                            {/* Layer 1: Back Tab & Plate */}
                            <div className={`absolute top-4 left-0 w-[45%] h-12 rounded-t-[20px] ${folder.backColor} z-0 shadow-inner`} />
                            <div className={`absolute top-14 left-0 right-0 bottom-0 rounded-tr-[24px] rounded-b-[24px] ${folder.backColor} z-0`} />

                            {/* Layer 2: The 3:4 Photographic Payload */}
                            <div className="absolute top-16 left-0 right-0 flex justify-center z-10 pointer-events-none group-hover:pointer-events-auto group-[.is-open]:pointer-events-auto">

                                {/* Left Image (-16deg) */}
                                <div
                                    onClick={(e) => handleImageClick(i, 0, e)}
                                    className="absolute w-[50%] aspect-[3/4] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[3px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom -rotate-6 -translate-x-4 translate-y-4 group-hover:-translate-y-[110px] group-hover:-translate-x-[60px] group-hover:-rotate-[16deg] group-[.is-open]:-translate-y-[110px] group-[.is-open]:-translate-x-[60px] group-[.is-open]:-rotate-[16deg] z-10 cursor-pointer hover:!scale-105"
                                >
                                    <FolderImage src={folder.images[0]} alt="Aster Event 1" />
                                </div>

                                {/* Right Image (+18deg) */}
                                <div
                                    onClick={(e) => handleImageClick(i, 1, e)}
                                    className="absolute w-[50%] aspect-[3/4] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[3px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom rotate-4 translate-x-4 translate-y-4 group-hover:-translate-y-[90px] group-hover:translate-x-[60px] group-hover:rotate-[18deg] group-[.is-open]:-translate-y-[90px] group-[.is-open]:translate-x-[60px] group-[.is-open]:rotate-[18deg] z-10 cursor-pointer hover:!scale-105"
                                >
                                    <FolderImage src={folder.images[1]} alt="Aster Event 2" />
                                </div>

                                {/* Center Image (High Vertical Pop) */}
                                <div
                                    onClick={(e) => handleImageClick(i, 2, e)}
                                    className="absolute w-[55%] aspect-[3/4] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-[4px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom z-20 translate-y-2 group-hover:-translate-y-[140px] group-hover:scale-110 group-[.is-open]:-translate-y-[140px] group-[.is-open]:scale-110 cursor-pointer hover:!scale-[1.15]"
                                >
                                    <FolderImage src={folder.images[2]} alt="Aster Event 3" />
                                </div>
                            </div>

                            {/* Layer 3: Front Cover (Contains exact content text) */}
                            <div className={`relative mt-20 p-8 md:p-10 rounded-[24px] shadow-[0_-8px_25px_rgba(21,40,61,0.15)] border-t border-white/30 flex flex-col items-center text-center z-20 flex-grow ${folder.frontColor} transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.02] group-hover:translate-y-2 group-[.is-open]:scale-[1.02] group-[.is-open]:translate-y-2 pointer-events-none`}>

                                {/* Raw Bootstrap Icon */}
                                <div className={`w-14 h-14 rounded-full ${folder.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                        {folder.icon}
                                    </svg>
                                </div>

                                <h3 className={`font-['Quicksand'] font-extrabold text-2xl md:text-3xl mb-4 tracking-tight ${folder.textColor} !${folder.textColor}`}>
                                    {folder.title}
                                </h3>

                                <p className={`font-['Quicksand'] text-sm md:text-base font-medium leading-[1.6] ${folder.textColor} !${folder.textColor} opacity-95`}>
                                    {folder.desc}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

                {/* =========================================================
            BOTTOM SECTION: FOOTER THESIS (TYPESETTING SCRUB)
        ========================================================= */}
                <div ref={textRef} className="text-center max-w-4xl mx-auto bg-[#F4F7FB] p-8 md:p-12 rounded-3xl border border-[#334a89]/10 shadow-sm">
                    <p className="font-['Quicksand'] text-lg md:text-xl lg:text-[22px] text-[#334a89] !text-[#334a89] font-bold leading-[1.7]">
                        {footerText.split(' ').map((word, i) => (
                            <span key={i} className="gsap-scrub-word inline-block mr-[0.25em] will-change-transform">
                {word}
              </span>
                        ))}
                    </p>
                </div>

            </div>

            {/* =========================================================
          THE FULL-SCREEN 9:16 IMAGE MODAL (Cinematic Transition)
      ========================================================= */}
            <div
                className={`fixed inset-0 z-[9999] bg-[#15283D]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={handleClose}
            >
                {/* Close Button (Bootstrap X) */}
                <button
                    className={`absolute top-6 right-6 md:top-8 md:right-10 z-[100] text-white/70 hover:text-white transition-all duration-500 delay-200 ${modalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleClose()
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>

                <div
                    className={`relative flex items-center justify-center max-w-5xl w-full h-full transform transition-all duration-500 delay-100 ${modalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Previous Button (Bootstrap Chevron Left) */}
                    <button
                        className="absolute left-0 md:-left-12 p-2 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
                        onClick={handlePrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>

                    {/* Main 9:16 Modal Image */}
                    <div className="relative w-full max-h-[85vh] flex justify-center">
                        <ModalImage
                            src={folderData[activeFolder].images[activeImage]}
                            alt={`Aster Event ${activeImage + 1}`}
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full font-['Quicksand']">
                            {activeImage + 1} / {folderData[activeFolder].images.length}
                        </div>
                    </div>

                    {/* Next Button (Bootstrap Chevron Right) */}
                    <button
                        className="absolute right-0 md:-right-12 p-2 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
                        onClick={handleNext}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
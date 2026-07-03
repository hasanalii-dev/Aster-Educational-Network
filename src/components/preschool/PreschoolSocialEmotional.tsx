import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Eye, Brain, Users, Sparkles, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const FolderImage = ({ src, alt }: { src: string, alt: string }) => {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            {!loaded && <div className="absolute inset-0 bg-white/10 animate-pulse rounded-lg z-0" />}
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

export function PreschoolSocialEmotional() {
    const sectionRef = useRef<HTMLElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const foldersRef = useRef<HTMLDivElement>(null)
    const bulletRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    const [openFolder, setOpenFolder] = useState<number | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeFolder, setActiveFolder] = useState(0)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
                )
            }

            if (foldersRef.current) {
                gsap.fromTo(
                    foldersRef.current.children,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: foldersRef.current, start: 'top 80%' }
                    }
                )
            }

            if (bulletRef.current) {
                gsap.fromTo(
                    bulletRef.current.children,
                    { opacity: 0, scale: 0.8, y: 20 },
                    {
                        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: bulletRef.current, start: 'top 85%' }
                    }
                )
            }

            if (footerRef.current) {
                gsap.fromTo(
                    footerRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 85%' } }
                )
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const folderData = [
        {
            title: 'Social Emotional Learning',
            desc: 'Through guided experiences, children learn to understand their emotions, build friendships, and navigate social situations with confidence.',
            frontColor: 'bg-[#e97f7b]',
            backColor: 'bg-[#cf6562]',
            images: [
                'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
            ]
        },
        {
            title: 'Islamic Education',
            desc: 'Children are gently introduced to Islamic values, Quranic learning, and moral foundations through age-appropriate stories, songs, and daily routines.',
            frontColor: 'bg-[#6ab39d]',
            backColor: 'bg-[#52937e]',
            images: [
                'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
            ]
        }
    ]

    const bulletItems = [
        { text: 'Empathy and kindness', icon: Heart },
        { text: 'Self-awareness', icon: Eye },
        { text: 'Emotional regulation', icon: Brain },
        { text: 'Respect for others', icon: Users },
        { text: 'Gratitude and humility', icon: Sparkles },
        { text: 'Strong moral values', icon: Shield },
    ]

    const toggleFolder = (i: number) => {
        setOpenFolder(openFolder === i ? null : i)
    }

    const handleImageClick = (folderIdx: number, imgIdx: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveFolder(folderIdx)
        setActiveImage(imgIdx)
        setModalOpen(true)
        document.body.style.overflow = 'hidden'
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

    return (
        <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 bg-[#334a89] select-none overflow-hidden relative">
            <div className="max-w-[1360px] mx-auto flex flex-col items-center">

                <div ref={introRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <Heart className="w-5 h-5 text-[#ffc715] shrink-0" strokeWidth={2.5} />
                        <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.3em] text-[#ffc715] uppercase mt-0.5 text-left md:text-center">
                            SOCIAL, EMOTIONAL & ISLAMIC DEVELOPMENT
                        </span>
                    </div>

                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-white leading-[1.05] mb-8">
                        Developing Both <em className="font-medium italic text-[#ffc715]">Character</em> and Competence
                    </h2>

                    <div className="w-16 h-[2px] bg-[#ffc715] mb-10" />

                    <p className="font-['Quicksand'] text-base md:text-lg lg:text-[20px] text-white/80 leading-[1.65] font-medium max-w-3xl">
                        At Aster, education is about developing both character and competence. Through Social Emotional Learning and Islamic education, children learn:
                    </p>
                </div>

                {/* 3D Folder UI */}
                <div ref={foldersRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 xl:gap-12 mb-20 max-w-4xl mx-auto w-full">
                    {folderData.map((folder, i) => (
                        <div
                            key={i}
                            onClick={() => toggleFolder(i)}
                            className={`group relative pt-14 flex flex-col h-full w-full max-w-sm mx-auto md:max-w-none cursor-pointer transition-all duration-300 ${openFolder === i ? 'is-open z-50' : 'z-10 hover:z-50'}`}
                        >
                            {/* Back Tab & Plate */}
                            <div className={`absolute top-4 left-0 w-[45%] h-12 rounded-t-[20px] ${folder.backColor} z-0 shadow-inner`} />
                            <div className={`absolute top-14 left-0 right-0 bottom-0 rounded-tr-[24px] rounded-b-[24px] ${folder.backColor} z-0`} />

                            {/* Photo Payload */}
                            <div className="absolute top-16 left-0 right-0 flex justify-center z-10 pointer-events-none group-hover:pointer-events-auto group-[.is-open]:pointer-events-auto">
                                <div onClick={(e) => handleImageClick(i, 0, e)} className="cursor-pointer hover:!scale-105 absolute w-[50%] aspect-[3/4] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[3px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom -rotate-6 -translate-x-4 translate-y-4 group-hover:-translate-y-[110px] group-hover:-translate-x-[60px] group-hover:-rotate-[16deg] group-[.is-open]:-translate-y-[110px] group-[.is-open]:-translate-x-[60px] group-[.is-open]:-rotate-[16deg] z-10 overflow-hidden">
                                    <FolderImage src={folder.images[0]} alt="Aster Early Years 1" />
                                </div>
                                <div onClick={(e) => handleImageClick(i, 1, e)} className="cursor-pointer hover:!scale-105 absolute w-[50%] aspect-[3/4] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-[3px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom rotate-4 translate-x-4 translate-y-4 group-hover:-translate-y-[90px] group-hover:translate-x-[60px] group-hover:rotate-[18deg] group-[.is-open]:-translate-y-[90px] group-[.is-open]:translate-x-[60px] group-[.is-open]:rotate-[18deg] z-10 overflow-hidden">
                                    <FolderImage src={folder.images[1]} alt="Aster Early Years 2" />
                                </div>
                                <div onClick={(e) => handleImageClick(i, 2, e)} className="cursor-pointer hover:!scale-[1.15] absolute w-[55%] aspect-[3/4] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-[4px] border-white transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom z-20 translate-y-2 group-hover:-translate-y-[140px] group-hover:scale-110 group-[.is-open]:-translate-y-[140px] group-[.is-open]:scale-110 overflow-hidden">
                                    <FolderImage src={folder.images[2]} alt="Aster Early Years 3" />
                                </div>
                            </div>

                            {/* Front Cover */}
                            <div className={`relative mt-20 p-8 md:p-10 rounded-[24px] shadow-[0_-8px_25px_rgba(21,40,61,0.15)] border-t border-white/30 flex flex-col items-center text-center z-20 flex-grow ${folder.frontColor} transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.02] group-hover:translate-y-2 group-[.is-open]:scale-[1.02] group-[.is-open]:translate-y-2 pointer-events-none`}>
                                <h3 className="font-['Quicksand'] font-extrabold text-2xl md:text-3xl mb-4 tracking-tight text-white">
                                    {folder.title}
                                </h3>
                                <p className="font-['Quicksand'] text-sm md:text-base font-medium leading-[1.6] text-white opacity-95">
                                    {folder.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bullet badges */}
                <div ref={bulletRef} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-16 w-full max-w-4xl">
                    {bulletItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-[20px] px-6 py-4 md:px-8 md:py-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex items-center gap-3 md:gap-4 bg-white/10 backdrop-blur-sm border border-white/10"
                        >
                            <item.icon className="absolute -bottom-6 -right-6 w-20 h-20 pointer-events-none text-white/5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" strokeWidth={1} />
                            <div className="relative z-10 w-8 h-8 rounded-full bg-[#ffc715]/20 group-hover:bg-[#ffc715]/30 flex items-center justify-center shrink-0 transition-colors duration-500">
                                <item.icon className="w-4 h-4 text-[#ffc715]" strokeWidth={2} />
                            </div>
                            <span className="relative z-10 font-['Quicksand'] font-bold text-base md:text-lg text-white">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>

                <div ref={footerRef} className="text-center max-w-3xl mx-auto">
                    <p className="font-['Quicksand'] font-bold text-xl md:text-2xl text-[#ffc715] leading-snug">
                        These foundations help children build meaningful relationships and grow into compassionate individuals.
                    </p>
                </div>

            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 z-[9999] bg-[#15283D]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${modalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={handleClose}
            >
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
                    <button
                        className="absolute left-0 md:-left-12 p-2 text-white/70 hover:text-white hover:scale-110 transition-all z-10"
                        onClick={handlePrev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>

                    <div className="relative w-full max-h-[85vh] flex justify-center">
                        <ModalImage
                            src={folderData[activeFolder].images[activeImage]}
                            alt={`Aster Early Years ${activeImage + 1}`}
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full font-['Quicksand']">
                            {activeImage + 1} / {folderData[activeFolder].images.length}
                        </div>
                    </div>

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

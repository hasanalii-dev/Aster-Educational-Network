import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ImageWithSkeleton({ src, alt, className }: { src: string, alt: string, className?: string }) {
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`${className} ${loaded ? 'opacity-90' : 'opacity-0'} transition-all`}
            />
        </>
    )
}

export function ContactLocations() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. General Enquiries Banner Animation
            gsap.fromTo('.enquiries-banner',
                { opacity: 0, y: 60, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '.enquiries-banner', start: 'top 85%' }
                }
            )

            // 2. Advanced Nested Card Animations
            const cards = gsap.utils.toArray<HTMLElement>('.campus-card')

            cards.forEach((card) => {
                const elementsToStagger = card.querySelectorAll('.card-stagger-item')

                // Create a timeline for each card so the card appears, THEN its contents stagger in
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                })

                // Animate the card container itself
                tl.fromTo(card,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }
                )

                // Stagger the internal content (Title, Address, Phone, Email)
                if (elementsToStagger.length > 0) {
                    tl.fromTo(elementsToStagger,
                        { opacity: 0, x: -15 },
                        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                        "-=0.6" // Start this slightly before the card finishes sliding up
                    )
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const campuses = [
        {
            name: "PECHS Junior Campus",
            address: "Plot 37 C, Block-6 PECHS, Karachi City, Sindh, Pakistan, 75500",
            phone: "+92 336 882 7837",
            email: "info@aster.edu.pk",
            mapImage: "https://res.cloudinary.com/lpxp5l3a/image/upload/v1783163524/junior_b24khc.png",
            mapLink: "https://maps.google.com/?q=Plot+37+C%2C+Block-6+PECHS%2C+Karachi+City%2C+Sindh%2C+Pakistan%2C+75500"
        },
        {
            name: "PECHS Senior Campus",
            address: "33-D, Block 6, PECHS, Shahrah-e-Faisal Road, Karachi, Pakistan, 75500",
            phone: "+92 327 362 9321",
            email: "info.seniorcampus@aster.edu.pk",
            mapImage: "https://res.cloudinary.com/lpxp5l3a/image/upload/v1783163524/pechs_fl1lew.png",
            mapLink: "https://maps.google.com/?q=33-D%2C+Block+6%2C+PECHS%2C+Shahrah-e-Faisal+Road%2C+Karachi%2C+Pakistan%2C+75500"
        },
        {
            name: "Clifton Campus",
            address: "Plot D, 97, Block 4, Block 2 Clifton, Karachi, Pakistan",
            phone: "+92 306 222 7837",
            email: "info.clifton@aster.edu.pk",
            mapImage: "https://res.cloudinary.com/lpxp5l3a/image/upload/v1783163524/clifton_xr243t.png",
            mapLink: "https://maps.google.com/?q=Plot+D%2C+97%2C+Block+4%2C+Block+2+Clifton%2C+Karachi%2C+Pakistan"
        },
        {
            name: "Riyadh Campus",
            address: "Address Details Coming Soon",
            phone: "+966 XX XXX XXXX",
            email: "info.riyadh@aster.edu.pk",
            mapImage: "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=800&auto=format&fit=crop",
            mapLink: "https://maps.google.com/?q=Riyadh+Saudi+Arabia"
        }
    ]

    return (
        <section ref={sectionRef} className="py-24 md:py-36 bg-[#F8F9FA] px-6 md:px-12 border-t border-[#E5E7EB]">
            <div className="max-w-[1400px] mx-auto campus-grid">

                {/* =========================================================
                    GENERAL ENQUIRIES BANNER (Cinematic Gradient)
                ========================================================= */}
                <div className="enquiries-banner bg-gradient-to-br from-[#15283D] to-[#2a3c82] rounded-[40px] p-10 md:p-14 shadow-[0_30px_60px_rgba(21,40,61,0.15)] relative overflow-hidden mb-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                    {/* Ambient Glow Effects */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full filter blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#ffc715]/5 rounded-full filter blur-[60px] pointer-events-none translate-y-1/2" />

                    <div className="relative z-10 max-w-xl">
                        <span className="font-['Quicksand'] font-bold text-[11px] tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                            GET IN TOUCH
                        </span>
                        <h2 className="font-['Quicksand'] text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            General Enquiries
                        </h2>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 w-full lg:w-auto">
                        <div className="flex items-start gap-5 group cursor-pointer">
                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10 shadow-inner transition-colors group-hover:bg-[#ffc715]">
                                <Mail className="w-6 h-6 text-[#ffc715] group-hover:text-[#15283D] transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-['Quicksand'] font-bold text-white text-[16px] mb-2 tracking-wide">Email & Phone</h4>
                                <a href="mailto:info@aster.edu.pk" className="block font-['Quicksand'] text-white/80 font-medium text-[15px] group-hover:text-[#ffc715] transition-colors">info@aster.edu.pk</a>
                                <a href="tel:+923368827837" className="block font-['Quicksand'] text-white/80 font-medium text-[15px] mt-1 group-hover:text-[#ffc715] transition-colors">+92 336 882 7837</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                                <Clock className="w-6 h-6 text-[#ffc715]" />
                            </div>
                            <div>
                                <h4 className="font-['Quicksand'] font-bold text-white text-[16px] mb-2 tracking-wide">Admin Hours</h4>
                                <p className="font-['Quicksand'] text-white/80 font-medium text-[15px]">Monday – Friday</p>
                                <p className="font-['Quicksand'] text-white/80 font-medium text-[15px] mt-1">9:00 AM – 4:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    CAMPUSES GRID (Awwwards-Tier SaaS Cards)
                ========================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {campuses.map((campus, i) => (
                        <div key={i} className="campus-card group bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(21,40,61,0.04)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(51,74,137,0.12)] hover:-translate-y-2 flex flex-col border border-[#E5E7EB] hover:border-[#334a89]/20 transform-gpu">

                            {/* Cinematic Interactive Map Header */}
                            <a
                                href={campus.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-full h-[280px] overflow-hidden block cursor-pointer bg-[#15283D]"
                            >
                                <ImageWithSkeleton
                                    src={campus.mapImage}
                                    alt={`Map illustration of ${campus.name}`}
                                    className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#15283D]/60 via-[#15283D]/0 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                                {/* Glassmorphic Action Button (Centers perfectly, scales up on hover) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:scale-100">
                                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xl text-[#15283D] px-7 py-4 rounded-full font-['Quicksand'] font-bold text-[13px] tracking-widest uppercase shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                                        Open in Maps
                                        <ExternalLink className="w-4 h-4 text-[#334a89] ml-1" />
                                    </div>
                                </div>
                            </a>

                            {/* Elevated Card Details Body */}
                            <div className="p-8 md:p-12 flex-1 flex flex-col relative bg-white z-10">

                                {/* Staggered Heading */}
                                <div className="card-stagger-item flex items-center justify-between gap-4 mb-8">
                                    <h3 className="font-['Quicksand'] text-[26px] md:text-[30px] font-bold text-[#15283D] tracking-tight group-hover:text-[#334a89] transition-colors">
                                        {campus.name}
                                    </h3>
                                    <div className="w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center shrink-0 text-[#15283D]/30 group-hover:text-[#334a89] group-hover:border-[#334a89]/30 transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Staggered Interactive Data List */}
                                <div className="space-y-3 mt-auto">

                                    <div className="card-stagger-item group/item flex items-start gap-5 p-4 rounded-2xl hover:bg-[#F8F9FA] transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-full bg-[#F4F6F8] group-hover/item:bg-white group-hover/item:shadow-sm border border-transparent group-hover/item:border-[#E5E7EB] flex items-center justify-center shrink-0 transition-all duration-300">
                                            <MapPin className="w-4 h-4 text-[#334a89]" />
                                        </div>
                                        <div className="pt-2">
                                            <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[15px] leading-relaxed">
                                                {campus.address}
                                            </p>
                                        </div>
                                    </div>

                                    <a href={`tel:${campus.phone.replace(/\s+/g, '')}`} className="card-stagger-item group/item flex items-center gap-5 p-4 rounded-2xl hover:bg-[#F8F9FA] transition-colors duration-300 block">
                                        <div className="w-10 h-10 rounded-full bg-[#F4F6F8] group-hover/item:bg-white group-hover/item:shadow-sm border border-transparent group-hover/item:border-[#E5E7EB] flex items-center justify-center shrink-0 transition-all duration-300">
                                            <Phone className="w-4 h-4 text-[#334a89]" />
                                        </div>
                                        <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[15px] group-hover/item:text-[#334a89] transition-colors">
                                            {campus.phone}
                                        </p>
                                    </a>

                                    <a href={`mailto:${campus.email}`} className="card-stagger-item group/item flex items-center gap-5 p-4 rounded-2xl hover:bg-[#F8F9FA] transition-colors duration-300 block">
                                        <div className="w-10 h-10 rounded-full bg-[#F4F6F8] group-hover/item:bg-white group-hover/item:shadow-sm border border-transparent group-hover/item:border-[#E5E7EB] flex items-center justify-center shrink-0 transition-all duration-300">
                                            <Mail className="w-4 h-4 text-[#334a89]" />
                                        </div>
                                        <p className="font-['Quicksand'] text-[#5C5C61] font-medium text-[15px] group-hover/item:text-[#334a89] transition-colors">
                                            {campus.email}
                                        </p>
                                    </a>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
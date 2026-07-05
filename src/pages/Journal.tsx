import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, BrainCircuit, HeartHandshake, Lightbulb, GraduationCap, User, Search, School } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    cover_image_url: string;
    author_name: string;
    published_at: string;
    created_at: string;
}

const CATEGORY_INFO = [
    {
        name: 'Parenting & Child Development',
        desc: 'Supporting children through every stage of growth.',
        icon: HeartHandshake,
        bgColor: 'bg-[#ffc715]',
        textColor: 'text-white'
    },
    {
        name: 'Education & Learning',
        desc: 'Exploring meaningful approaches to teaching and learning.',
        icon: BookOpen,
        bgColor: 'bg-[#394EA2]',
        textColor: 'text-white'
    },
    {
        name: 'Future Skills & Innovation',
        desc: 'Preparing children for an ever-changing world.',
        icon: BrainCircuit,
        bgColor: 'bg-[#ffc715]',
        textColor: 'text-white'
    },
    {
        name: 'Character & Wellbeing',
        desc: 'Building confidence, resilience, leadership, and strong values.',
        icon: Lightbulb,
        bgColor: 'bg-[#394EA2]',
        textColor: 'text-white'
    },
    {
        name: 'School Stories',
        desc: 'Celebrating learning, achievements, and community at Aster.',
        icon: GraduationCap,
        bgColor: 'bg-[#ffc715]',
        textColor: 'text-white'
    }
];

export default function Journal() {
    const { user, loading: authLoading } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    // GSAP Refs for Hero
    const sectionRef = useRef<HTMLElement>(null)
    const bannerFrameRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const textStackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchArticles = async () => {
            const { data, error } = await supabase
                .from('journal_articles')
                .select('id, title, slug, category, excerpt, cover_image_url, author_name, published_at, created_at')
                .eq('is_published', true)
                .order('published_at', { ascending: false })
            
            if (error) console.error("Error fetching articles:", error);
            if (data) setArticles(data);
            setLoading(false);
        }
        fetchArticles()
    }, [])

    useEffect(() => {
        if (!user || authLoading) return;

        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(
                textStackRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.1 }
            )

            const mm = gsap.matchMedia()

            mm.add('(min-width: 768px)', () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=400',
                        scrub: true,
                    },
                })

                tl.to(
                    bannerFrameRef.current,
                    {
                        width: '100%',
                        maxWidth: '100%',
                        borderRadius: '0px',
                        ease: 'none',
                    },
                    0
                )

                tl.fromTo(
                    imageRef.current,
                    { yPercent: -10, scale: 1.15 },
                    { yPercent: 10, scale: 1.05, ease: 'none' },
                    0
                )
            })

            mm.add('(max-width: 767px)', () => {
                gsap.to(bannerFrameRef.current, {
                    borderRadius: '0px',
                    width: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=250',
                        scrub: true,
                    },
                })
            })

            // Universal Section Fade-in
            const elements = gsap.utils.toArray<HTMLElement>('.gsap-fade')
            elements.forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [user, authLoading])

    if (authLoading) return <div className="min-h-screen bg-[#FAFAFA]" />;

    // ONLY ADMINS CAN SEE THIS PAGE RIGHT NOW
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
            <SEO title="The Aster Journal" />
                <style>{`
                    @keyframes bounce-subtle {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-bounce-subtle {
                        animation: bounce-subtle 2s ease-in-out infinite;
                    }
                `}</style>
                <div className="text-center max-w-lg mx-auto p-12 bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_20px_60px_rgba(21,40,61,0.04)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc715] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                    
                    {/* Animated Building Loader */}
                    <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#394EA2]/5 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-[#394EA2]/10 rounded-full animate-pulse"></div>
                        <School className="w-10 h-10 text-[#394EA2] relative z-10 animate-bounce-subtle" />
                    </div>

                    <h2 className="font-['Quicksand'] text-3xl md:text-4xl font-bold text-[#15283D] mb-4">Under Development</h2>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-[17px] font-medium leading-relaxed max-w-md mx-auto">
                        The Aster Journal is currently being crafted. Please check back soon for exciting updates and stories from our community.
                    </p>
                    <Link to="/" className="inline-flex items-center justify-center gap-2 mt-8 px-8 py-4 bg-[#F4F6F8] rounded-full text-[#394EA2] font-['Quicksand'] font-bold uppercase tracking-wider text-sm hover:bg-[#394EA2] hover:text-white transition-all duration-300">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div id="page-journal" className="bg-[#FAFAFA] min-h-screen pb-20">
            
            {/* HERO SECTION */}
            <section ref={sectionRef} className="w-full pt-28 md:pt-32 pb-16 md:pb-24 relative z-10 flex flex-col items-center overflow-x-hidden overflow-y-visible bg-[#FAFAFA] select-none">
                
                <div ref={bannerFrameRef} className="w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] relative will-change-transform" style={{ borderRadius: '16px' }}>
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ borderRadius: 'inherit' }}>
                        <img 
                            ref={imageRef}
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_1200,q_auto,f_auto/v1783261770/montessori-v2_qnqjbe.png" 
                            alt="Students in discussion" 
                            className="w-full h-full object-cover will-change-transform"
                        />
                        <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
                    </div>
                </div>

                <div className="absolute top-28 md:top-32 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none">
                    <div 
                        ref={textStackRef}
                        className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 bg-[#394EA2] w-fit min-w-[85%] md:min-w-[700px] py-10 px-8 md:py-12 md:px-16 text-left z-20 pointer-events-auto"
                    >
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-[#ffc715] uppercase block mb-4">
                            THE ASTER JOURNAL
                        </span>
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium text-white tracking-tight leading-none mb-6">
                            Inspiring growth.
                        </h1>
                        <p className="font-['Quicksand'] text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                            Whether you're a parent, educator, or lifelong learner, our goal is simple: to provide ideas that help children thrive.
                        </p>
                    </div>
                </div>

            </section>

            {/* FEATURED ARTICLES */}
            <section id="articles-section" className="py-12 md:py-20">
                <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                    <div className="gsap-fade flex flex-col md:flex-row items-end justify-between mb-8 gap-6 pb-6">
                        <div>
                            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#15283D] mb-3">Featured Articles</h2>
                            <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium">Latest insights from our educational community.</p>
                        </div>
                        <div className="relative w-full md:w-auto">
                            <input type="text" placeholder="Search journal..." className="bg-white border border-gray-200 rounded-full py-3 px-6 pr-12 font-['Quicksand'] text-sm w-full md:w-64 focus:outline-none focus:border-[#394EA2] transition-colors" />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="gsap-fade flex flex-wrap items-center gap-3 mb-12 border-b border-gray-200 pb-6">
                        <button 
                            onClick={() => setSelectedCategory('All')}
                            className={`px-5 py-2.5 rounded-full font-['Quicksand'] text-sm font-bold tracking-wider transition-colors border ${selectedCategory === 'All' ? 'bg-[#394EA2] text-white border-[#394EA2]' : 'bg-transparent text-[#5C5C61] border-gray-200 hover:border-[#394EA2] hover:text-[#394EA2]'}`}
                        >
                            ALL
                        </button>
                        {CATEGORY_INFO.map((cat, i) => (
                            <button 
                                key={i}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-5 py-2.5 rounded-full font-['Quicksand'] text-sm font-bold tracking-wider transition-colors border ${selectedCategory === cat.name ? 'bg-[#394EA2] text-white border-[#394EA2]' : 'bg-transparent text-[#5C5C61] border-gray-200 hover:border-[#394EA2] hover:text-[#394EA2]'}`}
                            >
                                {cat.name.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-[20px] h-96 shadow-sm border border-gray-100"></div>
                            ))}
                        </div>
                    ) : articles.filter(a => selectedCategory === 'All' || a.category === selectedCategory).length === 0 ? (
                        <div className="bg-white rounded-[24px] p-16 text-center border border-gray-100 shadow-sm">
                            <BookOpen className="w-16 h-16 text-[#394EA2]/20 mx-auto mb-6" />
                            <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#15283D] mb-3">No articles found</h3>
                            <p className="text-[#5C5C61] text-lg font-['Quicksand'] font-medium">Try selecting a different category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.filter(a => selectedCategory === 'All' || a.category === selectedCategory).map((article, index) => (
                                <Link 
                                    to={`/journal/${article.slug}`} 
                                    key={article.id}
                                    className="gsap-fade group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 transform hover:-translate-y-1"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                                            <span className="font-['Quicksand'] text-[10px] font-bold text-[#394EA2] uppercase tracking-[0.1em]">{article.category}</span>
                                        </div>
                                        <img 
                                            src={article.cover_image_url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#15283D] mb-4 group-hover:text-[#394EA2] transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="font-['Quicksand'] text-[#5C5C61] text-sm leading-relaxed mb-8 flex-1 font-medium">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-[#15283D]">
                                                <div className="w-6 h-6 rounded-full bg-[#f4f5f7] flex items-center justify-center">
                                                    <User className="w-3 h-3" />
                                                </div>
                                                <span className="font-['Quicksand'] text-xs font-bold uppercase tracking-wider">{article.author_name || 'Aster Team'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#78716C]">
                                                <span className="font-['Quicksand'] text-xs font-medium uppercase tracking-wider">{new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* BROWSE BY CATEGORY - BRAND IDENTITY UI CARDS */}
            <section className="py-16 md:py-24 bg-white border-y border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                
                <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                    <div className="gsap-fade text-center mb-16">
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                            EXPLORE TOPICS
                        </span>
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#15283D] mb-6">Browse By Category</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {CATEGORY_INFO.map((cat, i) => (
                            <div 
                                key={i} 
                                onClick={() => {
                                    setSelectedCategory(cat.name);
                                    document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`gsap-fade group cursor-pointer p-8 rounded-[24px] ${cat.bgColor} hover:shadow-2xl transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1 flex flex-col justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[220px]`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {/* Top right faint border graphic */}
                                <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                                
                                {/* Background faint Icon Watermark */}
                                <cat.icon className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-[0.07] group-hover:scale-110 group-hover:opacity-[0.12] transition-all duration-500 ease-out" />
                                
                                <div className="relative z-10">
                                    <h3 className={`font-['Quicksand'] text-2xl font-bold ${cat.textColor} mb-3 leading-tight max-w-[80%]`}>{cat.name}</h3>
                                </div>
                                
                                <div className="relative z-10 mt-auto">
                                    <p className={`font-['Quicksand'] ${cat.textColor} opacity-90 text-sm font-medium leading-relaxed max-w-[90%]`}>{cat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINALE SECTION (AboutFinale style) */}
            <section className="bg-white py-24 px-6 md:px-12">
                <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20 gsap-fade">
                    <div className="max-w-3xl text-center flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-4">
                            <HeartHandshake className="w-4 h-4 text-[#394da1]" />
                            <span className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#394da1] uppercase mt-0.5">
                                WHY WE SHARE
                            </span>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#334a89] mb-6">
                            At Aster, we believe learning extends beyond the classroom. The Aster Journal is a space where ideas are explored, knowledge is shared, and meaningful conversations begin.
                        </h2>
                        <p className="font-['Quicksand'] font-medium text-base md:text-lg text-[#5C5C61] leading-relaxed">
                            Helping families and educators support children with greater understanding and purpose.
                        </p>
                    </div>
                    <div className="w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30">

                        {/* Logo Watermark */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                            <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                        </div>

                        <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                            STAY CONNECTED
                        </span>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                            Discover new articles, educational insights, and stories from The Aster School.
                        </h2>
                        <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                            The Aster School — <strong className="text-[#ffc715] font-bold">Whatever It Takes!</strong>
                        </p>
                        <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                            <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">Begin your child’s journey with Aster.</h3>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="btn-aster btn-aster-primary">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    <span>Explore Articles</span>
                                </button>
                                <Link to="/contact" className="btn-aster btn-aster-outline">
                                    <span>Subscribe for Updates</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

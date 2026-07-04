import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks'
import { supabase } from '@/lib/supabase'
import DOMPurify from 'dompurify'
import { BookOpen, User, Calendar, ArrowLeft } from 'lucide-react'

interface Article {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    author_name: string;
    published_at: string;
}

export default function JournalArticle() {
    const { slug } = useParams<{ slug: string }>()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
    useDocumentTitle(article ? `${article.title} — The Aster Journal` : 'Article — The Aster Journal')

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return
            setLoading(true)
            const { data, error } = await supabase
                .from('journal_articles')
                .select('*')
                .eq('slug', slug)
                .single()
            
            if (error || !data) {
                console.error("Error fetching article:", error)
                setError("Article not found.")
            } else {
                setArticle(data)
            }
            setLoading(false)
        }
        fetchArticle()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-[#394EA2] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center flex-col px-4">
                <BookOpen className="w-16 h-16 text-gray-300 mb-6" />
                <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#15283D] mb-4">Article Not Found</h1>
                <p className="font-['Quicksand'] text-gray-500 mb-8">We couldn't find the article you were looking for.</p>
                <Link to="/journal" className="btn-aster btn-aster-primary">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
                </Link>
            </div>
        )
    }

    // Sanitize HTML to prevent XSS attacks
    const cleanContent = DOMPurify.sanitize(article.content, {
        ADD_ATTR: ['target'] // Allow target="_blank" on links if added by quill
    });

    return (
        <div id="page-journal-article" className="bg-[#FAFAFA] min-h-screen">
            
            {/* HERO SECTION */}
            <section className="relative w-full h-[60vh] min-h-[500px] bg-white overflow-hidden flex flex-col justify-end pt-[140px]">
                <div className="absolute inset-0 w-full h-full pb-[4rem] pt-[120px]">
                    <div className="relative w-full h-full max-w-[1440px] mx-auto md:px-12">
                        <div className="w-full h-full overflow-hidden rounded-t-[32px] md:rounded-[32px] shadow-2xl relative bg-gray-100">
                            {article.cover_image_url ? (
                                <img 
                                    src={article.cover_image_url} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#394EA2]/5">
                                    <BookOpen className="w-24 h-24 text-[#394EA2]/20" />
                                </div>
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#15283D]/80 via-[#15283D]/40 to-transparent"></div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-56 md:top-64 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-[1360px] h-[35vh] md:h-[50vh] min-h-[300px] pointer-events-none left-1/2 -translate-x-1/2">
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white w-fit min-w-[85%] md:min-w-[800px] py-10 px-8 md:py-16 md:px-20 z-20 pointer-events-auto top-0 -translate-y-1/2 flex flex-col items-center text-center shadow-xl">
                        <Link to="/journal" className="absolute top-6 left-6 text-gray-400 hover:text-[#394EA2] transition-colors flex items-center gap-2 font-['Quicksand'] text-xs font-bold uppercase tracking-wider">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Link>
                        
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.2em] text-[#ffc715] bg-[#15283D] px-4 py-1.5 rounded-full uppercase mb-6 mt-4 md:mt-0">
                            {article.category}
                        </span>
                        
                        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#15283D] leading-[1.15] mb-8 tracking-tight">
                            {article.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-6 font-['Quicksand'] text-[#5C5C61] font-medium text-sm border-t border-gray-100 pt-6 w-full">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#394EA2]" />
                                <span>{article.author_name || 'Aster Team'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#394EA2]" />
                                <span>{new Date(article.published_at || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <article className="max-w-[800px] mx-auto px-6 py-24 md:py-32">
                {article.cover_image_url && (
                    <div className="mb-12 w-full rounded-[24px] overflow-hidden shadow-lg border border-[#E7E5E4]">
                        <img 
                            src={article.cover_image_url} 
                            alt={article.title} 
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                    </div>
                )}
                
                {article.excerpt && (
                    <div className="mb-12 font-['Playfair_Display'] text-2xl md:text-3xl text-[#394EA2] italic leading-relaxed text-center border-b border-gray-200 pb-12">
                        "{article.excerpt}"
                    </div>
                )}
                
                {/* The rich text content rendered here */}
                <div 
                    className="prose prose-lg md:prose-xl max-w-none prose-headings:font-['Playfair_Display'] prose-headings:text-[#15283D] prose-p:font-['Quicksand'] prose-p:text-[#5C5C61] prose-a:text-[#394EA2] prose-a:font-bold hover:prose-a:text-[#ffc715] prose-strong:text-[#15283D] prose-img:rounded-2xl prose-img:shadow-lg prose-ul:font-['Quicksand'] prose-li:text-[#5C5C61] prose-li:marker:text-[#394EA2]"
                    dangerouslySetInnerHTML={{ __html: cleanContent }} 
                />
            </article>

            {/* FINALE SECTION (AboutFinale style) */}
            <section className="bg-white py-24 px-6 md:px-12 border-t border-gray-100">
                <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-20 gsap-fade">
                    <div className="w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30 mt-8">

                        {/* Logo Watermark */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                            <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                        </div>

                        <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-6 relative z-10">
                            KEEP EXPLORING
                        </span>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.1] mb-6 relative z-10">
                            Looking for more ideas and insights?
                        </h2>
                        <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-2xl leading-relaxed mb-12 relative z-10">
                            Discover more articles from our educators, parents, and community leaders.
                        </p>
                        <div className="w-full max-w-xl border-t border-white/20 pt-10 flex flex-col items-center gap-8 relative z-10">
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link to="/journal" className="btn-aster btn-aster-primary">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    <span>Browse The Journal</span>
                                </Link>
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

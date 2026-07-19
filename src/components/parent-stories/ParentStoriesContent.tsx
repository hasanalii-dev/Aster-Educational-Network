import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ParentStory } from '@/types'

gsap.registerPlugin(ScrollTrigger)

export function ParentStoriesContent() {
    const sectionRef = useRef<HTMLElement>(null)
    const [stories, setStories] = useState<ParentStory[]>([])

    useEffect(() => {
        const fetchStories = async () => {
            const { data } = await supabase
                .from('parent_stories')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
            
            if (data) {
                const themes = ['white', 'blue', 'light', 'yellow']
                const storiesWithThemes = data.map((story, i) => ({
                    ...story,
                    theme: themes[i % themes.length]
                }))
                setStories(storiesWithThemes as ParentStory[])
            }
        }
        fetchStories()
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
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
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-white px-6 md:px-12 relative z-20">

            {/* =========================================================
                TOP CLOUD BORDER
            ========================================================= */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none -translate-y-[99%] rotate-180">
                <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FFFFFF" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FFFFFF" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
                </svg>
            </div>

            <div className="max-w-[1000px] mx-auto flex flex-col gap-24 relative z-10">
                
                {/* Intro */}
                <div className="flex flex-col gap-6 text-center md:text-left gsap-fade">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#15283D] leading-tight">
                        The Growth Parents See. The Difference Children Feel.
                    </h2>
                    <div className="font-['Quicksand'] text-lg text-[#5C5C61] leading-relaxed space-y-4">
                        <p>Every child arrives at Aster with unique strengths, interests, and potential.</p>
                        <p>Over time, parents often notice something remarkable happening beyond report cards and academic progress. They see their children becoming more confident, independent, resilient, curious, and capable.</p>
                        <p>These stories reflect the experiences of families who have been part of the Aster journey and witnessed meaningful growth in their children.</p>
                        <p className="font-bold text-[#334a89]">Because the true impact of education is not only seen in what children learn, but in who they become.</p>
                    </div>
                </div>

                {/* What Parents Notice Most */}
                <div className="gsap-fade bg-[#FAFAFA] p-8 md:p-12 border-l-4 border-[#ffc715] rounded-r-xl">
                    <h3 className="font-['Quicksand'] font-bold text-xs tracking-[0.25em] text-[#334a89] uppercase mb-4">WHAT PARENTS NOTICE MOST</h3>
                    <p className="font-['Quicksand'] text-lg text-[#5C5C61] mb-10">While every child's journey is different, many families share similar observations about the growth they see over time.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div>
                            <h4 className="font-['Quicksand'] font-bold text-[#15283D] mb-3 text-xl">Confidence</h4>
                            <p className="font-['Quicksand'] text-[#5C5C61] leading-relaxed">Children become more willing to express themselves, participate, take initiative, and embrace new challenges.</p>
                        </div>
                        <div>
                            <h4 className="font-['Quicksand'] font-bold text-[#15283D] mb-3 text-xl">Independence</h4>
                            <p className="font-['Quicksand'] text-[#5C5C61] leading-relaxed">Students develop the ability to think for themselves, take responsibility, and approach learning with greater ownership.</p>
                        </div>
                        <div>
                            <h4 className="font-['Quicksand'] font-bold text-[#15283D] mb-3 text-xl">Love for Learning</h4>
                            <p className="font-['Quicksand'] text-[#5C5C61] leading-relaxed">Curiosity grows as children learn through meaningful experiences, exploration, and hands-on discovery.</p>
                        </div>
                        <div>
                            <h4 className="font-['Quicksand'] font-bold text-[#15283D] mb-3 text-xl">Character & Values</h4>
                            <p className="font-['Quicksand'] text-[#5C5C61] leading-relaxed">Parents often notice stronger empathy, responsibility, resilience, gratitude, and respect in everyday interactions.</p>
                        </div>
                        <div className="md:col-span-2">
                            <h4 className="font-['Quicksand'] font-bold text-[#15283D] mb-3 text-xl">Communication</h4>
                            <p className="font-['Quicksand'] text-[#5C5C61] leading-relaxed">Students become more confident in expressing ideas, sharing opinions, presenting their work, and engaging with others.</p>
                        </div>
                    </div>
                </div>

                {/* Categories with real testimonials */}
                <StoryCategory 
                    title="GROWING IN CONFIDENCE"
                    subtitle="Finding Their Voice"
                    description="From classroom discussions and presentations to performances, competitions, sports, and leadership opportunities, students are regularly encouraged to step beyond their comfort zones. Many parents describe confidence as one of the most significant transformations they observe during their child's time at Aster."
                    stories={stories.slice(0, 2)}
                />

                <StoryCategory 
                    title="DEVELOPING A LOVE FOR LEARNING"
                    subtitle="Curious Minds That Keep Growing"
                    description="At Aster, learning is designed to be engaging, meaningful, and connected to real life. Parents frequently share how their children become more enthusiastic about reading, asking questions, exploring ideas, and taking ownership of their learning."
                    stories={stories.slice(2, 4)}
                />

                <StoryCategory 
                    title="BUILDING INDEPENDENCE & RESPONSIBILITY"
                    subtitle="Growing Beyond the Classroom"
                    description="One of the most valuable outcomes of education is helping children become capable, responsible, and self-motivated individuals. Through opportunities to make decisions, solve problems, collaborate with others, and take ownership of their learning, students develop skills that serve them well both inside and outside school."
                    stories={stories.slice(4, 6)}
                />

                <StoryCategory 
                    title="CHARACTER THAT LASTS"
                    subtitle="Values in Action"
                    description="At Aster, character development is woven into everyday experiences. Parents often speak about the positive impact they see in their children's behaviour, relationships, sense of responsibility, and connection to values such as integrity, humility, compassion, and service. These qualities become visible not only in school but at home and within the wider community."
                    stories={stories.slice(6, 8)}
                />

                <StoryCategory 
                    title="THRIVING BEYOND ACADEMICS"
                    subtitle="Discovering Strengths, Passions & Potential"
                    description="Growth happens in many forms. Whether through sports, swimming, robotics, performances, sustainability initiatives, leadership opportunities, community projects, or creative expression, students are encouraged to discover new interests and develop confidence in their abilities. Parents often describe these experiences as some of the most memorable and transformative aspects of their child's journey."
                    stories={stories.slice(8, 10)}
                />

                {/* Conclusion - Finale Card */}
                <div className="gsap-fade w-full bg-[#334a89] rounded-[36px] p-10 md:p-20 text-center text-white relative shadow-2xl overflow-hidden flex flex-col items-center border border-[#394da1]/30 mt-12">
                    {/* Logo Watermark */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-[400px] md:w-[600px] opacity-10 select-none pointer-events-none z-0">
                        <img src="/logo.jpg" alt="" className="w-full h-full object-contain grayscale mix-blend-screen" />
                    </div>
                    
                    <div className="absolute top-0 left-12 right-12 h-1.5 bg-[#ffc715] rounded-b-md" />
                    <div className="relative z-10 w-full flex flex-col items-center">
                        <span className="font-['Quicksand'] font-bold text-xs tracking-[0.3em] text-white/70 uppercase mb-8">
                            THE ASTER JOURNEY THROUGH PARENT EYES
                        </span>
                        
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium text-white max-w-4xl leading-[1.2] mb-8">
                            “The most meaningful measure of a school's impact is often found in the stories families share.”
                        </h2>
                        
                        <p className="font-['Quicksand'] font-medium text-base md:text-lg text-white/95 max-w-3xl leading-relaxed">
                            These journeys are unique to every child, but they all reflect a shared belief: That education should help children become the very best version of themselves. <span className="text-[#ffc715] font-bold">The Aster School — Whatever It Takes!</span>
                        </p>
                        
                        <div className="w-full max-w-xl border-t border-white/20 mt-10 pt-10 flex flex-col items-center gap-8">
                            <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-white">
                                We would be honoured to become part of your child's story.
                            </h3>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link to="/admissions" className="btn-aster btn-aster-primary">
                                    <span>Join the Waitlist</span>
                                    <span className="btn-arrow" style={{ marginLeft: 4 }}>→</span>
                                </Link>
                                <Link to="/campuses" className="btn-aster btn-aster-white">
                                    <span>Book a Campus Visit</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

function StoryCategory({ title, subtitle, description, stories }: { title: string, subtitle: string, description: string, stories: any[] }) {
    return (
        <div className="gsap-fade flex flex-col gap-8 pt-16 border-t border-gray-200">
            <div className="max-w-3xl">
                <span className="font-['Quicksand'] font-bold text-xs md:text-sm tracking-[0.25em] text-[#334a89] uppercase mb-4 block">
                    {title}
                </span>
                <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#15283D] mb-6 leading-tight">
                    {subtitle}
                </h3>
                <p className="font-['Quicksand'] text-lg text-[#5C5C61] leading-relaxed">
                    {description}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {stories.map((story) => (
                    <TestimonialCard key={story.id} testimonial={story} />
                ))}
            </div>
        </div>
    )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
    if (!testimonial) return null;
    
    const theme = testimonial.theme || 'light';
    let bgClass = "bg-[#F4F6F8] border border-transparent hover:bg-white hover:border-[#E5E7EB]";
    let textClass = "text-[#15283D]";
    let roleClass = "text-[#5C5C61]";
    let quoteIconColor = "text-[#334a89]/10";
    let authorPillClass = "bg-white border border-[#E5E7EB]";
    let avatarContainerClass = "bg-white border-2 border-[#E5E7EB]";

    if (theme === 'blue') {
        bgClass = "bg-[#334a89] border border-transparent";
        textClass = "text-white";
        roleClass = "text-white/70";
        quoteIconColor = "text-[#ffc715]/20";
        authorPillClass = "bg-white/10 border border-white/10 backdrop-blur-md";
        avatarContainerClass = "bg-white/10 border-2 border-white/20";
    } else if (theme === 'yellow') {
        bgClass = "bg-[#ffc715] border border-transparent";
        textClass = "text-[#15283D]";
        roleClass = "text-[#15283D]/70";
        quoteIconColor = "text-[#15283D]/10";
        authorPillClass = "bg-white/40 border border-white/30 backdrop-blur-md";
        avatarContainerClass = "bg-white/50 border-2 border-white/40";
    }

    return (
        <div className={`p-8 md:p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col group ${bgClass}`}>
            <div className="flex justify-between items-start mb-6">
                <Quote className={`w-8 h-8 ${quoteIconColor} rotate-180 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12`} fill="currentColor" />
            </div>

            <p className={`font-['Quicksand'] text-[16px] leading-[1.65] font-medium mb-8 flex-1 ${textClass}`}>
                "{testimonial.quote}"
            </p>

            <div className={`flex items-center gap-4 p-3 pr-6 rounded-full ${authorPillClass} self-start`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden ${avatarContainerClass}`}>
                     {testimonial.image_url ? (
                        <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                     ) : (
                        <User className={`w-4 h-4 ${theme === 'blue' ? 'text-white' : 'text-[#334a89]'}`} />
                     )}
                </div>
                <div>
                    <h4 className={`font-['Quicksand'] font-bold text-[13px] tracking-wide leading-tight ${textClass}`}>
                        {testimonial.name}
                    </h4>
                    <p className={`font-['Quicksand'] text-[10px] font-bold uppercase tracking-[0.1em] mt-1 ${roleClass}`}>
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </div>
    )
}

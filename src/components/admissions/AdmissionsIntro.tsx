import { Award, Target, MapPin, Globe } from 'lucide-react'

export function AdmissionsIntro() {
    return (
        <section className="bg-white pt-20 pb-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 mb-20 md:mb-24 mt-[-20px] md:mt-[-40px]">
                <div className="gsap-fade w-full bg-[#15283D] border border-white/10 shadow-2xl rounded-[24px] p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 relative overflow-hidden">
                    {/* Subtle decorative background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
                    
                    <div className="relative flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                            <Award className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                        </div>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#ffc715] tracking-widest uppercase">
                            Licensed Cambridge<br className="hidden lg:block"/> School
                        </span>
                    </div>

                    <div className="hidden lg:block w-px h-16 bg-white/20 relative" />

                    <div className="relative flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                            <Target className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                        </div>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#ffc715] tracking-widest uppercase">
                            100% Cambridge<br className="hidden lg:block"/> Success Rate
                        </span>
                    </div>

                    <div className="hidden lg:block w-px h-16 bg-white/20 relative" />

                    <div className="relative flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                            <MapPin className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                        </div>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#ffc715] tracking-widest uppercase">
                            3<br className="hidden lg:block"/> Campuses
                        </span>
                    </div>

                    <div className="hidden lg:block w-px h-16 bg-white/20 relative" />

                    <div className="relative flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                            <Globe className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                        </div>
                        <span className="font-['Quicksand'] font-bold text-sm md:text-base text-[#ffc715] tracking-widest uppercase">
                            International Expansion<br className="hidden lg:block"/> to Riyadh
                        </span>
                    </div>
                </div>
            </div>
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    <div className="gsap-fade flex flex-col gap-6">
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase">
                            Begin Your Child's Aster Journey
                        </span>
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-[1.15]">
                            Choosing a school is one of the most important decisions a family will make.
                        </h2>
                        <div className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed space-y-6 mt-4">
                            <p>
                                At The Aster School, we understand that parents are not simply looking for a place where their child will study. They are looking for an environment where their child will be known, nurtured, challenged, and inspired to grow.
                            </p>
                            <p>
                                Our admissions process is designed to help families explore whether Aster is the right fit for their child while allowing us to build a strong partnership with every family that joins our community.
                            </p>
                            <p className="text-[#334a89] font-bold">
                                We look forward to welcoming families who share our belief that education should prepare children not only for academic success, but for a meaningful and purposeful life.
                            </p>
                        </div>
                    </div>

                    <div className="gsap-fade relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl">
                        <img 
                            src="https://res.cloudinary.com/lpxp5l3a/image/upload/c_scale,w_1200,q_auto,f_auto/v1783254166/As_part_of_Mental_Health_week_our_students_practiced_mindfulness_through_yoga_explored_emotion_4_s1s0dh.jpg" 
                            alt="Aster School Students"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15283D]/60 via-transparent to-transparent" />
                    </div>

                </div>
            </div>
        </section>
    )
}

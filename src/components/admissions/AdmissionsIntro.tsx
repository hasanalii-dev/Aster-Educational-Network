export function AdmissionsIntro() {
    return (
        <section className="bg-white py-24 border-b border-[#E5E7EB]">
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
                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop" 
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

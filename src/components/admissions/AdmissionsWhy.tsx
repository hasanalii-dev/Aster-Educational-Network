export function AdmissionsWhy() {
    const points = [
        "Academic excellence",
        "Future-ready learning",
        "Leadership opportunities",
        "Strong values and character development",
        "Sports and co-curricular excellence",
        "Innovation and creativity",
        "Meaningful school-family partnerships"
    ]

    return (
        <section className="bg-[#F8F9FA] py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 text-center">
                
                <div className="gsap-fade max-w-3xl mx-auto mb-16">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#394EA2] uppercase mb-4 block">
                        Why Families Choose Aster
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight mb-6">
                        More than a traditional school experience.
                    </h2>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed">
                        Families choose a learning environment that combines exactly what their child needs to succeed in the modern world.
                    </p>
                </div>

                <div className="gsap-fade grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
                    {points.map((point, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB] flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#ffc715]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffc715]" />
                            </div>
                            <span className="font-['Quicksand'] text-[#15283D] font-bold text-base leading-snug">
                                {point}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="gsap-fade max-w-3xl mx-auto bg-[#394EA2] p-10 md:p-12 rounded-[24px] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffc715] rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <p className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium leading-relaxed relative z-10">
                        "Most importantly, they choose a school that sees the potential within every child and is committed to helping them grow into confident, capable, and compassionate individuals."
                    </p>
                </div>

            </div>
        </section>
    )
}

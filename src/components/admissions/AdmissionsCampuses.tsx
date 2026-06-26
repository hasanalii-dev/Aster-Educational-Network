export function AdmissionsCampuses() {
    const campuses = [
        {
            name: "PECHS Junior Campus",
            grades: "Early Years – Grade 4",
            desc: "A vibrant learning community where children build academic confidence, independence, and essential life skills."
        },
        {
            name: "PECHS Senior Campus",
            grades: "Grade 5 – Grade 11",
            desc: "A future-focused environment that prepares students for Cambridge qualifications, leadership opportunities, and life beyond school."
        },
        {
            name: "Clifton Campus",
            grades: "Early Years – Grade 5",
            desc: "A nurturing environment focused on strong foundations, curiosity-driven learning, and holistic development."
        }
    ]

    return (
        <section className="bg-[#15283D] py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div className="gsap-fade max-w-3xl mb-16 text-center mx-auto">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        Find The Right Campus
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-white leading-tight mb-6">
                        Learning Environments Designed for Every Stage
                    </h2>
                </div>

                <div className="gsap-fade grid grid-cols-1 md:grid-cols-3 gap-8">
                    {campuses.map((campus, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-[24px] p-8 hover:bg-white/10 transition-colors duration-300">
                            <h3 className="font-['Quicksand'] text-2xl font-bold text-white mb-2">
                                {campus.name}
                            </h3>
                            <div className="inline-block px-3 py-1 bg-[#ffc715] text-[#15283D] font-['Quicksand'] font-bold text-xs uppercase tracking-wider rounded-md mb-6">
                                {campus.grades}
                            </div>
                            <p className="font-['Quicksand'] text-white/70 text-base font-medium leading-relaxed">
                                {campus.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

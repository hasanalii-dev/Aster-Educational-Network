export function AdmissionsCriteria() {
    const qualities = [
        "Curiosity and a willingness to learn",
        "Positive attitudes toward growth and development",
        "Respectful and collaborative behaviour",
        "Family commitment to the child's educational journey",
        "Alignment with the values and culture of the school"
    ]

    const documents = [
        "Child's Birth Certificate",
        "B-Form / Identification Documents",
        "Recent Passport-Size Photographs",
        "Previous School Reports (where applicable)",
        "School Leaving Certificate (where applicable)",
        "Parent/Guardian CNIC Copies",
        "Any additional documentation requested by the Admissions Office"
    ]

    return (
        <section className="bg-white py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    {/* What We Look For */}
                    <div className="gsap-fade">
                        <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#394EA2] uppercase mb-4 block">
                            What We Look For
                        </span>
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight mb-6">
                            Building Strong School-Family Partnerships
                        </h2>
                        <div className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed space-y-6">
                            <p>
                                Admissions decisions are not based solely on academic performance.
                            </p>
                            <p>
                                We seek students and families who will thrive within the Aster community and embrace our values of excellence, resilience, and humility. We look for:
                            </p>
                            <ul className="space-y-3 mt-4">
                                {qualities.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#ffc715]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ffc715]" />
                                        </div>
                                        <span className="text-[#15283D] font-semibold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="pt-4 border-t border-[#E5E7EB]">
                                Every child is unique, and we take a holistic approach when considering applications.
                            </p>
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div className="gsap-fade bg-[#F8F9FA] rounded-[24px] p-8 md:p-12 border border-[#E5E7EB]">
                        <h3 className="font-['Playfair_Display'] text-3xl font-medium text-[#15283D] mb-6">
                            Required Documents
                        </h3>
                        <p className="font-['Quicksand'] text-[#5C5C61] text-base font-medium mb-8">
                            To begin the admissions process, families may be asked to provide:
                        </p>
                        <ul className="space-y-4">
                            {documents.map((doc, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[#394EA2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-['Quicksand'] font-medium text-[#15283D]">{doc}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-['Quicksand'] text-sm text-[#5C5C61] mt-8 pt-6 border-t border-[#E5E7EB]">
                            * Specific requirements may vary depending on grade level and admissions stage.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export function AdmissionsProcess() {
    const steps = [
        {
            num: "1",
            title: "Submit an Enquiry",
            desc: "Complete the enquiry form and share your child's details with our admissions team."
        },
        {
            num: "2",
            title: "Campus Visit & Parent Meeting",
            desc: "Visit the campus, explore our learning environments, and meet members of our admissions team to learn more about the Aster experience."
        },
        {
            num: "3",
            title: "Student Observation or Assessment",
            desc: "Depending on the age and grade level, students may participate in a classroom observation, interaction session, or age-appropriate assessment."
        },
        {
            num: "4",
            title: "Admission Decision",
            desc: "Families will be informed of the admission outcome and offered placement based on seat availability and admissions criteria."
        },
        {
            num: "5",
            title: "Enrollment & Welcome to Aster",
            desc: "Upon confirmation, families complete the enrollment process and begin their journey as part of the Aster community."
        }
    ]

    return (
        <section className="bg-white py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div className="gsap-fade max-w-3xl mb-16">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        The Admissions Process
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight mb-6">
                        A Simple Journey Towards Enrollment
                    </h2>
                </div>

                <div className="gsap-fade relative border-l-2 border-[#E5E7EB] ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            {/* Marker */}
                            <div className="absolute -left-[45px] md:-left-[61px] top-0 w-10 h-10 md:w-12 md:h-12 bg-[#394EA2] rounded-full flex items-center justify-center font-['Quicksand'] font-bold text-white text-lg md:text-xl border-4 border-white shadow-sm z-10">
                                {step.num}
                            </div>
                            
                            <h3 className="font-['Quicksand'] text-xl md:text-2xl font-bold text-[#15283D] mb-3 pt-1">
                                Step {step.num}: {step.title}
                            </h3>
                            <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed max-w-3xl">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

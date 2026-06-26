import { useState } from 'react'

export function AdmissionsFaq() {
    const faqs = [
        {
            q: "When should I apply?",
            a: "We encourage families to begin the admissions process as early as possible, as spaces may become limited during the academic year."
        },
        {
            q: "Do all students complete an assessment?",
            a: "Assessment requirements vary by age and grade level. Younger children typically participate in observation-based interactions, while older students may complete age-appropriate assessments."
        },
        {
            q: "Can I visit the campus before applying?",
            a: "Yes. We encourage families to schedule a campus visit to experience the learning environment firsthand."
        },
        {
            q: "Is Aster a Cambridge school?",
            a: "Yes. The Aster School follows the Cambridge curriculum pathway and is a licensed Cambridge school."
        },
        {
            q: "Can I apply during the academic year?",
            a: "Applications may be considered throughout the year subject to seat availability."
        }
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="bg-white py-24 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div className="gsap-fade max-w-3xl mb-12">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        Frequently Asked Questions
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#15283D] leading-tight">
                        Common Admissions Queries
                    </h2>
                </div>

                <div className="gsap-fade max-w-4xl">
                    <div className="divide-y divide-[#E5E7EB]">
                        {faqs.map((faq, i) => (
                            <div key={i} className="py-6">
                                <button 
                                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                >
                                    <h3 className="font-['Quicksand'] text-xl font-bold text-[#15283D] group-hover:text-[#394EA2] transition-colors pr-8">
                                        {faq.q}
                                    </h3>
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'border-[#394EA2] bg-[#394EA2] text-white' : 'border-[#E5E7EB] text-[#5C5C61]'}`}>
                                        <svg className={`w-4 h-4 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed pr-12">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

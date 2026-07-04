import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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

function FAQItem({ faq, isOpen, onClick, index }: { faq: {q: string, a: string}, isOpen: boolean, onClick: () => void, index: number }) {
    const isBlue = index % 2 === 0
    const bgColor = isBlue ? 'bg-[#334a89]' : 'bg-[#ffc715]'
    const iconColor = isBlue ? 'text-[#334a89]' : 'text-[#ffc715]'

    return (
        <div 
            className={`relative overflow-hidden transition-[border-radius,background-color,height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md text-white ${bgColor} ${isOpen ? 'rounded-2xl' : 'rounded-[32px] md:rounded-[40px]'}`}
        >
            <button
                onClick={onClick}
                className={`relative z-10 w-full flex items-center justify-between text-left focus:outline-none group transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] text-white ${isOpen ? 'p-6 md:p-8 pb-4' : 'px-6 py-5 md:px-10 md:py-8'}`}
            >
                <h3 className={`font-['Quicksand'] font-bold text-lg md:text-xl pr-8 transition-colors duration-300 text-white`}>
                    {faq.q}
                </h3>
                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white ${iconColor} transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180 shadow-inner' : 'rotate-0 shadow-lg'}`}>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </button>
            <div 
                className="relative z-10 grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ 
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pt-0 font-['Quicksand'] text-white/95 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {faq.a}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AdmissionsFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="bg-[#fbfaf8] py-24 md:py-32 border-b border-[#E5E7EB]">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24">
                
                <div className="gsap-fade max-w-3xl mb-16 text-center mx-auto">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        Frequently Asked Questions
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#15283D] leading-tight">
                        Common Admissions Queries
                    </h2>
                </div>

                <div className="gsap-fade max-w-[900px] mx-auto">
                    <div className="flex flex-col gap-6 md:gap-8">
                        {faqs.map((faq, index) => (
                            <FAQItem 
                                key={index}
                                faq={faq}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

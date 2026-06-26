import { Link } from 'react-router-dom'

export function AdmissionsFinale() {
    return (
        <section className="bg-white py-24 pb-32">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-24 text-center">
                
                {/* Limited Seats Warning */}
                <div className="gsap-fade max-w-4xl mx-auto bg-[#F8F9FA] rounded-[24px] p-8 md:p-10 mb-20 border border-[#E5E7EB]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffc715]/20 text-[#394EA2] mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-['Quicksand'] text-2xl font-bold text-[#15283D] mb-4 uppercase tracking-widest">
                        Limited Seats. Exceptional Opportunities.
                    </h3>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg font-medium leading-relaxed max-w-3xl mx-auto">
                        To maintain meaningful learning experiences and personalized attention, class sizes are carefully managed across all campuses. As demand continues to grow, seats may become limited in certain grades and campuses. Families are encouraged to begin the admissions process early and join the waitlist to secure priority consideration for future openings.
                    </p>
                </div>

                <div className="gsap-fade max-w-3xl mx-auto">
                    <span className="font-['Quicksand'] font-bold text-sm tracking-[0.2em] text-[#ffc715] uppercase mb-4 block">
                        READY TO TAKE THE NEXT STEP?
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-medium text-[#15283D] leading-tight mb-6">
                        Join a community committed to developing confident learners.
                    </h2>
                    <p className="font-['Quicksand'] text-[#5C5C61] text-lg md:text-xl font-medium leading-relaxed mb-12">
                        Whatever It Takes!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <Link 
                            to="/admin/login" 
                            className="w-full sm:w-auto px-8 py-4 bg-[#394EA2] text-white font-['Quicksand'] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#15283D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Join the Waitlist
                        </Link>
                        <Link 
                            to="/campuses" 
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#15283D] text-[#15283D] font-['Quicksand'] font-bold text-sm tracking-wider uppercase rounded-full hover:bg-[#15283D] hover:text-white transition-all duration-300"
                        >
                            Schedule a Campus Visit
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

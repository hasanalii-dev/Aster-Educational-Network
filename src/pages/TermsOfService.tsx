import { Helmet } from 'react-helmet-async'

export default function TermsOfService() {
    return (
        <main className="pt-40 pb-32 bg-white min-h-screen font-['Quicksand']">
            <Helmet>
                <title>Terms of Service | The Aster School</title>
                <meta name="description" content="Terms of Service for The Aster School." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#15283D] mb-4 tracking-tight">Terms of Service</h1>
                <p className="text-[#A0AEC0] font-bold tracking-wide uppercase text-sm mb-12 border-b border-[#E5E7EB] pb-8">Last updated: July 2026</p>
                
                <div className="flex flex-col gap-10 text-[#5C5C61] font-medium text-[17px] leading-[1.8] [&_h2]:font-['Quicksand'] [&_h3]:font-['Quicksand'] [&_p]:font-['Quicksand'] [&_li]:font-['Quicksand']">
                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the website, admission portals, and digital services provided by The Aster School ("we", "our", "us"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not access or use our digital services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">2. Use of Our Services</h2>
                        <p className="mb-3">You agree to use our digital platforms exclusively for their intended educational and administrative purposes. You agree not to:</p>
                        <ul className="list-disc pl-6 flex flex-col gap-2">
                            <li>Use our portal in any way that violates applicable local, national, or international law.</li>
                            <li>Attempt to gain unauthorized access to our servers, databases, or any student information.</li>
                            <li>Submit false, misleading, or fraudulent information during the admissions process.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">3. User Accounts & Security</h2>
                        <p>
                            When you create an account with us, whether via email/password or third-party authentication (such as Google), you are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. If you suspect your account has been compromised, you must notify us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">4. Intellectual Property</h2>
                        <p>
                            All content, features, and functionality on this website—including but not limited to text, graphics, logos, images, and software—are the exclusive property of The Aster School and are protected by international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of our site without our express written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">5. Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your access to our portal immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service. Upon termination, your right to use the portal will cease immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">6. Limitation of Liability</h2>
                        <p>
                            In no event shall The Aster School, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our digital platforms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">7. Contact Information</h2>
                        <p>
                            For any questions, concerns, or legal inquiries regarding these Terms of Service, please contact our administration at:
                            <br/><br/>
                            <strong>The Aster School</strong><br/>
                            Email: administration@aster.edu.pk<br/>
                            Website: aster.edu.pk
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}

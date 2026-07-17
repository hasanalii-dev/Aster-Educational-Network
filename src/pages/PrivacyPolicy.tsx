import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
    return (
        <main className="pt-40 pb-32 bg-[#F4F6F8] min-h-screen font-['Quicksand']">
            <Helmet>
                <title>Privacy Policy | The Aster School</title>
                <meta name="description" content="Privacy Policy for The Aster School." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white rounded-[32px] p-8 md:p-16 shadow-[0_4px_24px_rgba(21,40,61,0.04)] border border-[#E5E7EB]">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#15283D] mb-4 tracking-tight">Privacy Policy</h1>
                <p className="text-[#A0AEC0] font-bold tracking-wide uppercase text-sm mb-12 border-b border-[#E5E7EB] pb-8">Last updated: July 2026</p>
                
                <div className="flex flex-col gap-10 text-[#5C5C61] font-medium text-[17px] leading-[1.8]">
                    <section>
                        <p>
                            The Aster School ("we", "our", or "us") respects your privacy and is committed to protecting the personal data of our students, parents, staff, and visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (aster.edu.pk) and use our online portals and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">1. Information We Collect</h2>
                        <p className="mb-3">We may collect personal identification information from you in a variety of ways, including, but not limited to, when you:</p>
                        <ul className="list-disc pl-6 flex flex-col gap-2">
                            <li>Register for an account on our parent or admissions portal.</li>
                            <li>Fill out an application or contact form.</li>
                            <li>Subscribe to our newsletters or school updates.</li>
                            <li>Authenticate using third-party services, such as Google.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">2. How We Use Your Information</h2>
                        <p className="mb-3">The information we collect is strictly used for educational and administrative purposes to ensure a seamless experience at The Aster School. We use your data to:</p>
                        <ul className="list-disc pl-6 flex flex-col gap-2">
                            <li>Process and manage school admissions and enrollments.</li>
                            <li>Communicate critical school updates, events, and academic progress.</li>
                            <li>Manage and secure your portal accounts.</li>
                            <li>Improve our website functionality and user experience.</li>
                        </ul>
                    </section>

                    <section className="bg-[#F4F6F8] p-8 rounded-[24px]">
                        <h2 className="text-2xl font-bold text-[#334a89] mb-4">3. Google User Data and Third-Party Authentication</h2>
                        <p className="mb-3">
                            To provide a secure and convenient login experience, our portal utilizes Google Authentication (OAuth). When you choose to "Continue with Google," we receive basic profile information required to authenticate your identity.
                        </p>
                        <ul className="list-disc pl-6 flex flex-col gap-2 mb-4">
                            <li><strong>What we access:</strong> We strictly access your primary Google email address and your full name.</li>
                            <li><strong>How we use it:</strong> This information is used exclusively to verify your identity, secure your session, and link you to your specific student/parent records in our database.</li>
                            <li><strong>Storage & Sharing:</strong> Your Google data is securely stored within our encrypted database. We <strong>do not</strong> share, sell, or distribute your Google user data to any third-party marketing, advertising, or external organizations under any circumstances.</li>
                        </ul>
                        <p className="text-sm font-bold text-[#15283D]/70 bg-white p-4 rounded-xl border border-[#E5E7EB]">
                            The Aster School's use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-[#334a89] underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">4. Data Security</h2>
                        <p>
                            We implement stringent technical and organizational security measures designed to protect the security of any personal information we process. Our databases are encrypted, and all digital communication is secured via SSL. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">5. Your Privacy Rights</h2>
                        <p>
                            As a parent or guardian, you have the right to review the information we hold about you or your child. You may request corrections, updates, or the deletion of your account data by contacting our administration directly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-[#15283D] mb-4">6. Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact our administrative office at: <br/><br/>
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

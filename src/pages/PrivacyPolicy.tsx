import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <Helmet>
                <title>Privacy Policy | The Aster School</title>
                <meta name="description" content="Privacy Policy for The Aster School." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="font-['Quicksand'] font-bold text-4xl text-[#15283D] mb-8">Privacy Policy</h1>
                
                <div className="prose prose-lg text-[#5C5C61] font-medium leading-relaxed font-['Quicksand'] max-w-none">
                    <p className="mb-6">Last updated: July 2026</p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">1. Information We Collect</h2>
                    <p className="mb-4">
                        The Aster School ("we", "our", or "us") is committed to protecting your privacy. We collect information that you provide directly to us, such as when you create an account, submit admission forms, or communicate with us. This may include your name, email address, phone number, and student information.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use the information we collect to operate our educational institution, process admissions, provide support, and communicate with you about school updates and events. We do not sell your personal information to third parties.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">3. Data Security</h2>
                    <p className="mb-4">
                        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We utilize industry-standard encryption and secure databases.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">4. Third-Party Services</h2>
                    <p className="mb-4">
                        We may use third-party services (such as Google Authentication) to facilitate our services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">5. Your Rights</h2>
                    <p className="mb-4">
                        You have the right to access, update, or delete the personal information we have on you. If you wish to exercise these rights, please contact us directly.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">6. Changes to This Policy</h2>
                    <p className="mb-4">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">7. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, please contact us at privacy@aster.edu.pk.
                    </p>
                </div>
            </div>
        </main>
    )
}

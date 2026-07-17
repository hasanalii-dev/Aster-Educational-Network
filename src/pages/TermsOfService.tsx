import { Helmet } from 'react-helmet-async'

export default function TermsOfService() {
    return (
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <Helmet>
                <title>Terms of Service | The Aster School</title>
                <meta name="description" content="Terms of Service for The Aster School." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <h1 className="font-['Quicksand'] font-bold text-4xl text-[#15283D] mb-8">Terms of Service</h1>
                
                <div className="prose prose-lg text-[#5C5C61] font-medium leading-relaxed font-['Quicksand'] max-w-none">
                    <p className="mb-6">Last updated: July 2026</p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing or using the website and portals provided by The Aster School, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">2. Use of Our Services</h2>
                    <p className="mb-4">
                        You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the services. Harassment, abusive behavior, and transmission of obscene or offensive content are strictly prohibited.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">3. User Accounts</h2>
                    <p className="mb-4">
                        When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">4. Intellectual Property</h2>
                    <p className="mb-4">
                        The service and its original content, features, and functionality are and will remain the exclusive property of The Aster School and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">5. Termination</h2>
                    <p className="mb-4">
                        We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">6. Changes to Terms</h2>
                    <p className="mb-4">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                    </p>

                    <h2 className="text-2xl font-bold text-[#15283D] mt-10 mb-4">7. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about these Terms, please contact us at legal@aster.edu.pk.
                    </p>
                </div>
            </div>
        </main>
    )
}

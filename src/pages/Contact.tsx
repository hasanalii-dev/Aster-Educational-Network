import { useDocumentTitle } from '@/hooks'

/**
 * Contact Us Page — Aster Pakistan
 * 
 * Content: Contact Form, Phone, Email,
 * Location Information, Inquiry Submission
 */
export default function Contact() {
  useDocumentTitle('Contact Us')

  return (
    <div id="page-contact">
      <section className="section-padding">
        <div className="container-default">
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Get in touch with Aster Pakistan. Contact form, phone, email, and location information.
          </p>
        </div>
      </section>
    </div>
  )
}

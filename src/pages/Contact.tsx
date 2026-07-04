import { ContactHero } from '../components/contact/ContactHero'
import { ContactLocations } from '../components/contact/ContactLocations'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactFinale } from '../components/contact/ContactFinale'

export default function ContactPage() {
    return (
        <main className="w-full overflow-hidden bg-white selection:bg-[#ffc715] selection:text-[#15283D]">
            <ContactHero />
            <ContactLocations />
            <ContactForm />
            <ContactFinale />
        </main>
    )
}

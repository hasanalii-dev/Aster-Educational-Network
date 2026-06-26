import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDocumentTitle } from '@/hooks'

import { AdmissionsHero } from '@/components/admissions/AdmissionsHero'
import { AdmissionsIntro } from '@/components/admissions/AdmissionsIntro'
import { AdmissionsWhy } from '@/components/admissions/AdmissionsWhy'
import { AdmissionsProcess } from '@/components/admissions/AdmissionsProcess'
import { AdmissionsCampuses } from '@/components/admissions/AdmissionsCampuses'
import { AdmissionsCriteria } from '@/components/admissions/AdmissionsCriteria'
import { AdmissionsFaq } from '@/components/admissions/AdmissionsFaq'
import { AdmissionsFinale } from '@/components/admissions/AdmissionsFinale'

gsap.registerPlugin(ScrollTrigger)

export default function Admissions() {
    useDocumentTitle('Admissions — The Aster School')
    const masterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Universal Section Fade-in
            const elements = gsap.utils.toArray<HTMLElement>('.gsap-fade')
            elements.forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' },
                    }
                )
            })
        }, masterRef)

        return () => ctx.revert()
    }, [])

    return (
        <div id="page-admissions" ref={masterRef} className="bg-white selection:bg-[#ffc715] selection:text-[#334a89]">
            {/* Google Fonts: Upright Garamond strictly for Headings; Quicksand for Body */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <AdmissionsHero />
            <AdmissionsIntro />
            <AdmissionsWhy />
            <AdmissionsProcess />
            <AdmissionsCampuses />
            <AdmissionsCriteria />
            <AdmissionsFaq />
            <AdmissionsFinale />
        </div>
    )
}

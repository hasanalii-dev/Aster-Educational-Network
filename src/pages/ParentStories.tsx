import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SEO } from '@/components/seo/SEO'

import { ParentStoriesHero } from '@/components/parent-stories/ParentStoriesHero'
import { ParentStoriesMasonry } from '@/components/parent-stories/ParentStoriesMasonry'
import { ParentStoriesFinale } from '@/components/parent-stories/ParentStoriesFinale'

gsap.registerPlugin(ScrollTrigger)

export default function ParentStories() {
    const masterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Universal Section Fade-in if needed
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
        <div id="page-parent-stories" ref={masterRef} className="bg-[#FAFAF9] selection:bg-[#ffc715] selection:text-[#334a89]">
            <SEO title="Parent Stories — The Aster School" />
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <ParentStoriesHero />
            <ParentStoriesMasonry />
            <ParentStoriesFinale />
        </div>
    )
}

import type { ReactNode, MouseEvent } from 'react'
import { useTransition } from './PageTransition'

/**
 * TransitionLink — Drop-in replacement for React Router's <Link>
 *
 * Triggers the GSAP page transition before navigating.
 * Falls back to normal navigation if outside TransitionProvider.
 */
interface TransitionLinkProps {
    to: string
    children: ReactNode
    className?: string
    id?: string
    onClick?: () => void
    'aria-label'?: string
}

export function TransitionLink({ to, children, className, id, onClick, ...rest }: TransitionLinkProps) {
    const { navigateWithTransition } = useTransition()

    const isExternal = to.startsWith('http')

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.()
        
        if (isExternal) {
            // Let the browser handle external links naturally
            return
        }
        
        e.preventDefault()
        navigateWithTransition(to)
    }

    return (
        <a
            href={to}
            className={className}
            id={id}
            onClick={handleClick}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            {...rest}
        >
            {children}
        </a>
    )
}

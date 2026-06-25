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

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onClick?.()
        navigateWithTransition(to)
    }

    return (
        <a
            href={to}
            className={className}
            id={id}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </a>
    )
}

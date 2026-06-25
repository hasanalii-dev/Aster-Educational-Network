import { useEffect, useRef } from 'react'

export function useDraggableScroll<T extends HTMLElement>() {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        let isDown = false
        let startY: number
        let scrollTop: number

        const onMouseDown = (e: MouseEvent) => {
            isDown = true
            el.dataset.cursorGrab = "active" // We can target this in our cursor logic
            startY = e.pageY - el.offsetTop
            scrollTop = el.scrollTop
        }

        const onMouseLeave = () => {
            isDown = false
            el.dataset.cursorGrab = "true"
        }

        const onMouseUp = () => {
            isDown = false
            el.dataset.cursorGrab = "true"
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDown) return
            e.preventDefault()
            const y = e.pageY - el.offsetTop
            const walk = (y - startY) * 1.5 // Scroll speed multiplier
            el.scrollTop = scrollTop - walk
        }

        el.addEventListener('mousedown', onMouseDown)
        el.addEventListener('mouseleave', onMouseLeave)
        el.addEventListener('mouseup', onMouseUp)
        el.addEventListener('mousemove', onMouseMove)

        return () => {
            el.removeEventListener('mousedown', onMouseDown)
            el.removeEventListener('mouseleave', onMouseLeave)
            el.removeEventListener('mouseup', onMouseUp)
            el.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return ref
}

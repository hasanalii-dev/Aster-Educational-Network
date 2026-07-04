import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
    message: string
    type: ToastType
    isVisible: boolean
    onClose: () => void
    duration?: number
}

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [isVisible, duration, onClose])

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        info: <CheckCircle2 className="w-5 h-5 text-blue-500" />
    }

    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200'
    }

    const textColors = {
        success: 'text-green-800',
        error: 'text-red-800',
        info: 'text-blue-800'
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColors[type]}`}
                >
                    {icons[type]}
                    <span className={`font-semibold text-sm ${textColors[type]}`}>{message}</span>
                    <button 
                        onClick={onClose} 
                        className={`ml-2 opacity-50 hover:opacity-100 transition-opacity ${textColors[type]}`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(modalRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in'
        });
        gsap.to(overlayRef.current, {
            opacity: 0, duration: 0.2, ease: 'power2.in', delay: 0.1,
            onComplete: onClose
        });
    };

    if (!isOpen) return null;

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#15283D]/40 backdrop-blur-sm p-4 opacity-0 select-none">
            <div ref={modalRef} className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-[0_40px_80px_rgba(21,40,61,0.12)] relative opacity-0">
                
                {/* Close Button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
                    <LogOut className="w-7 h-7 text-red-500 ml-1" />
                </div>

                {/* Content */}
                <h3 className="font-['Quicksand'] text-2xl font-bold text-[#15283D] mb-2">
                    Sign Out
                </h3>
                <p className="font-['Quicksand'] text-[15px] font-medium text-[#5C5C61] leading-relaxed mb-8">
                    Are you sure you want to log out of your account? You will need to sign in again to access your dashboard.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => {
                            // Quick exit animation
                            gsap.to(modalRef.current, { opacity: 0, scale: 0.9, duration: 0.2 });
                            gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onConfirm });
                        }}
                        className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-[20px] font-['Quicksand'] font-bold text-[14px] uppercase tracking-[0.1em] transition-colors"
                    >
                        Yes, Sign Out
                    </button>
                    <button 
                        onClick={handleClose}
                        className="w-full py-4 bg-[#F4F6F8] hover:bg-[#E5E7EB] text-[#15283D] rounded-[20px] font-['Quicksand'] font-bold text-[14px] uppercase tracking-[0.1em] transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

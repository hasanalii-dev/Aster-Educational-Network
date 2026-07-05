import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface AdminSelectProps {
    value: string;
    onChange: (val: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export function AdminSelect({ value, onChange, options, placeholder = 'Select...', className = '' }: AdminSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(o => o.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-[44px] px-4 flex items-center justify-between bg-[#F8FAFC] border-2 transition-all duration-200 rounded-xl font-['Quicksand'] font-semibold text-[14px] ${
                    isOpen 
                        ? 'border-[#394ea2] shadow-[0_0_0_4px_rgba(57,78,162,0.1)] bg-white' 
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0F172A]'
                }`}
            >
                <span className={selectedOption ? 'text-[#0F172A]' : 'text-[#94A3B8]'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-[#64748B]"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-white border border-[#E2E8F0] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl py-2 overflow-hidden"
                    >
                        <div className="max-h-[240px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                            {options.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full px-4 py-2.5 flex items-center justify-between text-left font-['Quicksand'] text-[14px] font-semibold transition-colors ${
                                            isSelected 
                                                ? 'bg-[#F0F4FF] text-[#394ea2]' 
                                                : 'text-[#334155] hover:bg-[#F8FAFC]'
                                        }`}
                                    >
                                        {option.label}
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            >
                                                <Check size={16} className="text-[#394ea2]" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

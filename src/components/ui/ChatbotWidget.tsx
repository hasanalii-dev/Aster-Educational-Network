import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

type Message = {
    id: string;
    text: string | React.ReactNode;
    sender: 'bot' | 'user';
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Hello! Welcome to The Aster School. How can I help you today?',
        sender: 'bot'
    }
];

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showOptions, setShowOptions] = useState(true);
    const [showCookieNotice, setShowCookieNotice] = useState(false);

    const chatWindowRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fabRef = useRef<HTMLButtonElement>(null);
    const cookieBubbleRef = useRef<HTMLDivElement>(null);

    // Initial Cookie Notice Logic
    useEffect(() => {
        const hasAccepted = localStorage.getItem('aster_cookies_accepted');
        if (!hasAccepted) {
            const showBubble = () => {
                setTimeout(() => {
                    setShowCookieNotice(true);
                }, 800); // Wait just a bit after loader
            };

            const fallbackTimer = setTimeout(showBubble, 4500); // Fallback if loader is already gone

            const handleLoader = () => {
                clearTimeout(fallbackTimer);
                showBubble();
            };

            window.addEventListener('asterLoaderFinished', handleLoader, { once: true });

            return () => {
                clearTimeout(fallbackTimer);
                window.removeEventListener('asterLoaderFinished', handleLoader);
            };
        }
    }, []);

    // Cookie Notice Animation
    useEffect(() => {
        if (showCookieNotice && cookieBubbleRef.current) {
            gsap.fromTo(cookieBubbleRef.current,
                { opacity: 0, y: 20, scale: 0.8, transformOrigin: "bottom right" },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
            );
            // Continuous floating animation
            gsap.to(cookieBubbleRef.current, {
                y: -6,
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: 0.6
            });
        }
    }, [showCookieNotice]);

    const handleAcceptCookies = () => {
        localStorage.setItem('aster_cookies_accepted', 'true');
        if (cookieBubbleRef.current) {
            gsap.to(cookieBubbleRef.current, {
                opacity: 0, y: 10, scale: 0.9, duration: 0.3, ease: "power2.in",
                onComplete: () => setShowCookieNotice(false)
            });
        } else {
            setShowCookieNotice(false);
        }
    };

    // Auto scroll to bottom
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // slight delay to allow options to render in DOM before scrolling
        const timeoutId = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timeoutId);
    }, [messages, isTyping, showOptions]);

    // Chat window animations
    useEffect(() => {
        if (isOpen && chatWindowRef.current) {
            gsap.fromTo(chatWindowRef.current,
                { opacity: 0, y: 30, scale: 0.95, transformOrigin: "bottom right" },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    const handleOpen = () => {
        if (showCookieNotice) handleAcceptCookies();
        setIsOpen(true);
    };

    const handleClose = () => {
        if (chatWindowRef.current) {
            gsap.to(chatWindowRef.current, {
                opacity: 0, y: 30, scale: 0.95, duration: 0.3, ease: "power3.in",
                onComplete: () => setIsOpen(false)
            });
        } else {
            setIsOpen(false);
        }
    };

    // Pre-recorded responses for quick actions
    const triggerPreRecordedResponse = (option: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: option, sender: 'user' }]);
        setShowOptions(false);
        setIsTyping(true);

        setTimeout(() => {
            let response: React.ReactNode = "";

            switch (option) {
                case "admission":
                case "signing up":
                    response = (
                        <div className="flex flex-col gap-3">
                            <p>We are currently accepting applications! Our admissions process is designed to be smooth and welcoming.</p>
                            <Link to="/admissions" onClick={handleClose} className="bg-white text-[#394EA2] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#ffc715] hover:text-[#15283D] transition-colors shadow-sm">
                                View Admissions Process
                            </Link>
                        </div>
                    );
                    break;
                case "book a campus tour":
                    response = (
                        <div className="flex flex-col gap-3">
                            <p>We would love to show you around our beautiful campuses! You can easily schedule a personalized tour online.</p>
                            <Link to="/book-tour" onClick={handleClose} className="bg-white text-[#394EA2] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#ffc715] hover:text-[#15283D] transition-colors shadow-sm">
                                Schedule a Campus Tour
                            </Link>
                        </div>
                    );
                    break;
                case "ciriculum":
                    response = (
                        <div className="flex flex-col gap-3">
                            <p>Our curriculum blends the National Curriculum of England with the International Primary Curriculum (IPC), focusing on holistic development.</p>
                            <Link to="/our-approach" onClick={handleClose} className="bg-white text-[#394EA2] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#ffc715] hover:text-[#15283D] transition-colors shadow-sm">
                                Explore Our Approach
                            </Link>
                        </div>
                    );
                    break;
                case "applying for job":
                    response = (
                        <div className="flex flex-col gap-3">
                            <p>We are always looking for passionate educators and staff to join the Aster family!</p>
                            <Link to="/careers" onClick={handleClose} className="bg-white text-[#394EA2] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#ffc715] hover:text-[#15283D] transition-colors shadow-sm">
                                View Open Positions
                            </Link>
                        </div>
                    );
                    break;
                case "contacting":
                    response = (
                        <div className="flex flex-col gap-3">
                            <p>Have a specific question? Feel free to reach out to our administration team directly.</p>
                            <Link to="/contact" onClick={handleClose} className="bg-white text-[#394EA2] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#ffc715] hover:text-[#15283D] transition-colors shadow-sm">
                                Go to Contact Page
                            </Link>
                        </div>
                    );
                    break;
                default:
                    response = "I have noted your request.";
            }

            setIsTyping(false);
            setMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'bot' }]);

            setTimeout(() => {
                setShowOptions(true);
            }, 800);
        }, 1000);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Disabled free typing logic
    };

    return (
        <>
            {/* Cookie Notice Speech Bubble */}
            {!isOpen && showCookieNotice && (
                <div
                    ref={cookieBubbleRef}
                    className="fixed bottom-[90px] right-6 z-[998] w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
                    style={{ opacity: 0 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-['Quicksand'] font-bold text-[#15283D] text-sm">Cookie Policy</h4>
                        <button onClick={handleAcceptCookies} className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="font-['Quicksand'] text-xs text-gray-600 mb-3">
                        We use cookies to ensure you get the best experience on our website.
                    </p>
                    <button
                        onClick={handleAcceptCookies}
                        className="w-full bg-[#394EA2] text-white py-1.5 rounded-lg text-xs font-bold hover:bg-[#2a3c82] transition-colors"
                    >
                        Accept & Continue
                    </button>
                    {/* Tail pointing down to FAB */}
                    <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45 z-[-1]"></div>
                </div>
            )}

            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    ref={fabRef}
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-[#394EA2] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[#394EA2]/30 hover:shadow-2xl transition-all duration-300 group"
                    aria-label="Open Chatbot"
                >
                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#ffc715] rounded-full animate-ping opacity-75"></span>
                    <span className="absolute top-0 right-0 w-3 h-3 bg-[#ffc715] rounded-full border-2 border-[#394EA2]"></span>
                    <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    className="fixed bottom-6 right-6 z-[1000] w-[350px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
                    style={{ opacity: 0 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#394EA2] to-[#2a3c82] px-5 py-4 flex items-center justify-between shadow-sm relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {/* Aster Logo instead of Bot Icon */}
                                <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center p-1 border border-white/20 shadow-inner">
                                    <img src="/logo.jpg" alt="Aster" className="w-full h-full object-contain rounded-none" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-[#2a3c82] rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-['Quicksand'] font-bold text-white text-lg leading-tight">Aster Assistant</h3>
                                <p className="font-['Quicksand'] text-[#ffc715] text-[10px] uppercase font-bold tracking-wider">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                                <Minus className="w-5 h-5" />
                            </button>
                            <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto bg-[#FAFAFA] p-5 flex flex-col gap-4 scroll-smooth">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                            >
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl font-['Quicksand'] text-[15px] leading-relaxed ${
                                    msg.sender === 'user' 
                                        ? 'bg-[#f0f0f0] text-[#15283D] rounded-br-sm' 
                                        : 'bg-[#394EA2] text-white rounded-bl-sm shadow-md'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 px-4 py-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} className="h-1" />
                    </div>

                    {/* Guided Options (always scrollable horizontally if needed) */}
                    <div className="px-4 py-3 bg-white border-t border-gray-50 min-h-[60px]">
                        {showOptions && !isTyping && (
                            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {['admission', 'signing up', 'book a campus tour', 'ciriculum', 'applying for job', 'contacting'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => triggerPreRecordedResponse(opt)}
                                        className="font-['Quicksand'] text-[13px] font-medium px-3 py-1.5 border border-[#394EA2]/20 text-[#394EA2] bg-white rounded-full hover:bg-[#394EA2] hover:text-white transition-all duration-300 hover:shadow-md"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleFormSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="AI chat is currently under development..."
                                disabled={true}
                                className="w-full bg-[#f4f5f7] rounded-full px-5 py-3 pr-12 font-['Quicksand'] text-[13px] text-[#15283D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#394EA2]/20 transition-shadow disabled:opacity-75 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={true}
                                className="absolute right-2 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

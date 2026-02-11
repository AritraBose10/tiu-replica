import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Admissions', path: '/admissions' },
        { name: 'Approvals', path: '/approvals' },
        { name: 'Events', path: '/events' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Google and IBM Courses', path: '/courses' },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo - School of the FUTURE */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] font-medium text-gray-600 tracking-wide">School of the</span>
                            <span className="text-xl font-black text-black tracking-tight">FUTURE</span>
                        </div>
                        <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
                            </svg>
                        </div>
                        <div className="flex flex-col leading-tight text-right">
                            <span className="text-[10px] font-bold text-black">techno india</span>
                            <span className="text-[10px] font-bold text-black">university</span>
                            <span className="text-[8px] font-normal text-[#FF0000]">WEST BENGAL</span>
                        </div>
                    </Link>

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex flex-col gap-1.5 p-2 focus:outline-none z-50"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-black block"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-0.5 bg-black block"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-black block"
                        />
                    </button>
                </div>
            </nav>

            {/* Full Screen Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white pt-24"
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`block py-4 text-2xl font-medium border-b border-gray-100 transition-colors ${location.pathname === link.path
                                                ? 'text-[#FF0000]'
                                                : 'text-black hover:text-[#FF0000]'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

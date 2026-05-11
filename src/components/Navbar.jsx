import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

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
 { name: 'Admissions', path: '/apply' },
 { name: 'Approvals', path: '/approvals' },
 { name: 'Events', path: '/events' },
 { name: 'Blogs', path: '/blogs' },
 { name: 'FAQ', path: '/faq' },
 { name: 'Google and IBM Courses', path: '/courses' },
 ];

 return (
 <>
 <nav
 className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-all duration-500 rounded-2xl border h-14 overflow-visible bg-[#f2f5f7] ${scrolled
 ? 'border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
 : 'border-gray-200/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]'
 }`}
 >
 <div className="flex items-center justify-between h-full px-6">
 {/* Logo */}
 <Link to="/" className="flex items-center">
 <img
 src={logo}
 alt="Techno India University"
 className="h-10 sm:h-11 md:h-12 w-auto object-contain"
 />
 </Link>

 {/* Hamburger Menu */}
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="flex flex-col gap-1.5 p-2 focus:outline-none z-50 group"
 aria-label="Toggle menu"
 >
 <motion.span
 animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
 className="w-6 h-0.5 bg-[#FF0000] block group-hover:bg-red-600 transition-colors"
 />
 <motion.span
 animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
 className="w-6 h-0.5 bg-[#FF0000] block group-hover:bg-red-600 transition-colors"
 />
 <motion.span
 animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
 className="w-6 h-0.5 bg-[#FF0000] block group-hover:bg-red-600 transition-colors"
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
 className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24"
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
 className={`block py-4 text-2xl font-medium border-b border-white/10 transition-all duration-300 ${location.pathname === link.path
 ? 'text-red-500 pl-4'
 : 'text-white/80 hover:text-red-500 hover:pl-4'
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

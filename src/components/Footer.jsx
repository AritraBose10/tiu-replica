import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4 md:px-6 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex flex-col leading-tight text-left">
                        <span className="text-[10px] font-medium text-gray-400 tracking-wide">School of the</span>
                        <span className="text-xl font-black text-white tracking-tight">FUTURE</span>
                    </div>
                    <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
                        </svg>
                    </div>
                    <div className="flex flex-col leading-tight text-left">
                        <span className="text-[10px] font-bold text-white">techno india</span>
                        <span className="text-[10px] font-bold text-white">university</span>
                        <span className="text-[8px] font-normal text-[#FF0000]">WEST BENGAL</span>
                    </div>
                </div>

                {/* Links */}
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                    <Link to="/admissions" className="text-gray-400 hover:text-white transition-colors">Admissions</Link>
                    <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                    <Link to="/approvals" className="text-gray-400 hover:text-white transition-colors">Approvals</Link>
                    <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Google and IBM Courses</Link>
                </nav>

                {/* Divider */}
                <div className="w-full h-px bg-gray-800 mb-6" />

                {/* Copyright */}
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Techno India University. Website Created By: FRIX Studio
                </p>
            </div>
        </footer>
    );
};

export default Footer;

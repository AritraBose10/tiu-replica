import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Footer = () => {
    return (
        <footer className="relative bg-black text-white py-8 border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center mb-0">
                    <img src={logo} alt="Techno India University" className="h-[200px] w-auto object-contain -my-14" />
                </div>

                {/* Links */}
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                    <Link to="/apply" className="text-gray-400 hover:text-white transition-colors">Admissions</Link>
                    <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                    <Link to="/approvals" className="text-gray-400 hover:text-white transition-colors">Approvals</Link>
                    <Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Google and IBM Courses</Link>
                </nav>

                {/* Divider */}
                <div className="w-full h-px bg-gray-800 mb-6" />

                {/* Copyright */}
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Techno India University. Website Created By: Aritra
                </p>
            </div>
        </footer>
    );
};

export default Footer;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Lab (NABL)", href: "/lab" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Careers", href: "/careers" },
    { name: "News", href: "/news" },
    { name: "Calculator", href: "/calculator" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            {/* Top Bar */}
            <div className="bg-primary text-white text-xs py-2 hidden md:block">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex space-x-6">
                        <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> +91-8977520918</span>
                        <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> Info.capstoneinfras@gmail.com</span>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/careers" className="hover:text-gray-200 transition-colors">Careers</Link>
                        <Link href="/news" className="hover:text-gray-200 transition-colors">News</Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/images/logo.svg"
                                alt="Capstone Infras Logo"
                                className="h-20 w-auto" // Adjust height as needed
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            href="/calculator"
                            className="bg-primary text-white px-5 py-2.5 rounded-none font-medium hover:bg-primary/90 transition-colors text-sm"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary transition-colors p-2"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/calculator"
                                className="block px-3 py-3 text-base font-medium text-secondary hover:bg-gray-50 rounded-md mt-4"
                                onClick={() => setIsOpen(false)}
                            >
                                Request a Quote →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

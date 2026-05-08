import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex flex-col mb-6">
                            <span className="text-2xl font-bold tracking-tight">CAPSTONE</span>
                            <span className="text-xs font-semibold tracking-[0.3em] ml-1 text-gray-300">INFRAS</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Leading the way in structural engineering, rigorous testing, and sustainable infrastructure development. Building trust, not just structures.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary"></span>
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/lab" className="hover:text-white transition-colors">NABL Laboratory</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
                            <li><Link href="/calculator" className="hover:text-white transition-colors">Cost Calculator</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Our Expertise
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary"></span>
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/services/structural-design" className="hover:text-white transition-colors">Structural Design</Link></li>
                            <li><Link href="/services/audit" className="hover:text-white transition-colors">Structural Audit</Link></li>
                            <li><Link href="/services/ndt" className="hover:text-white transition-colors">NDT Testing</Link></li>
                            <li><Link href="/services/project-management" className="hover:text-white transition-colors">Project Management</Link></li>
                            <li><Link href="/services/solar" className="hover:text-white transition-colors">Solar Engineering</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary"></span>
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                <span>Ratnapuri colony, 33-4-316, 4th Ln, Kavitha Nagar,<br />Vengalarao Nagar, Mallikarjunpet, Guntur,<br />Andhra Pradesh 522002</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-secondary shrink-0" />
                                <span>+91-8977520918</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-secondary shrink-0" />
                                <span>Info.capstoneinfras@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Capstone Infras. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

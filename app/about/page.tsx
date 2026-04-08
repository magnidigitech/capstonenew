"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Building, Users, Clock, ShieldCheck, Target, Lightbulb, Hammer, DraftingCompass, Briefcase } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                {/* Background Image - Desktop */}
                <div className="absolute inset-0 hidden md:block opacity-10">
                    <Image
                        src="/images/hero.png"
                        alt="About Capstone Infras"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Background Image - Mobile */}
                <div className="absolute inset-0 block md:hidden opacity-10">
                    <Image
                        src="/images/heromobile.png"
                        alt="About Capstone Infras Mobile"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        About Us
                    </motion.h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        We ensure peace of mind, trust, and transparent infrastructure development services.
                    </p>
                </div>
            </section>

            {/* Who We Are & Commitment */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Who We Are</span>
                            <h2 className="text-4xl font-bold text-primary mt-2 mb-6">Excellence in Construction</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We are a leading provider of comprehensive construction, design, and project management services. With a commitment to quality and innovation, we deliver effective solutions tailored to our clients’ needs across residential, commercial, and industrial projects.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We go beyond traditional construction by offering a seamless experience built on trust, transparency, and innovation. Our team of experts combines modern engineering with creative design to deliver spaces that reflect your vision and values. Every project is a partnership — we listen, adapt, and execute with precision.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=1997&auto=format&fit=crop"
                                alt="Construction Team"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StatCard number="450+" label="Projects Delivered" icon={<Building className="h-8 w-8 text-secondary mb-2 mx-auto" />} />
                        <StatCard number="1000+" label="Happy Clients" icon={<Users className="h-8 w-8 text-secondary mb-2 mx-auto" />} />
                        <StatCard number="300+" label="Spaces Transformed" icon={<Hammer className="h-8 w-8 text-secondary mb-2 mx-auto" />} />
                        <StatCard number="75+" label="Ongoing Projects" icon={<Clock className="h-8 w-8 text-secondary mb-2 mx-auto" />} />
                    </div>
                </div>
            </section>

            {/* Why Capstone? */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm">Why Choose Us</span>
                        <h2 className="text-3xl font-bold text-primary mt-2">Why Capstone Infra?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            title="Happy Transaction"
                            desc="Direct to Company Accounts. No Third-Party Collections. 100% Transparent & Secure."
                            icon={<ShieldCheck className="h-10 w-10 text-secondary" />}
                        />
                        <FeatureCard
                            title="Assured Quality"
                            desc="470+ Quality (QASCON) Checks performed by team of experts."
                            icon={<CheckCircle2 className="h-10 w-10 text-secondary" />}
                        />
                        <FeatureCard
                            title="Zero Delays"
                            desc="Zero tolerance for delays. We value your time above all."
                            icon={<Clock className="h-10 w-10 text-secondary" />}
                        />
                        <FeatureCard
                            title="Trusted By 1000+"
                            desc="Trusted by 1,000+ clients across the State for our reliability."
                            icon={<Users className="h-10 w-10 text-secondary" />}
                        />
                    </div>
                </div>
            </section>

            {/* Core Services */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Briefcase className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">Project Management</h3>
                            <p className="text-gray-600">Comprehensive project oversight ensuring timely delivery and budget adherence from conception to completion.</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <DraftingCompass className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">Architectural Design</h3>
                            <p className="text-gray-600">Innovative design solutions that blend functionality with aesthetics to create inspiring spaces.</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Hammer className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">Construction Execution</h3>
                            <p className="text-gray-600">Expert construction services with attention to detail and commitment to the highest quality standards.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Target className="h-8 w-8 text-secondary" />
                                <h3 className="text-3xl font-bold">Our Mission</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                At Capstone Build Solutions LLP, our mission is to transform ideas into tangible, lasting spaces through excellence in design, engineering, and execution. We strive to simplify the construction journey for every client by upholding transparency, professionalism, and creativity. We are committed to delivering high-quality, cost-effective projects on schedule through motivated and focused teams. By fostering trust and long-term relationships, we aim to ensure customer satisfaction at every stage. We also embrace sustainability by incorporating eco-friendly practices and utilizing the latest construction technologies to drive innovation.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Lightbulb className="h-8 w-8 text-secondary" />
                                <h3 className="text-3xl font-bold">Our Vision</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Our vision is to become India’s most trusted construction partner, recognized for integrity, innovation, and inspiring spaces that uplift lives and communities. We aspire to lead the evolution of smarter, future-ready infrastructure while consistently exceeding client expectations. Through our work, we aim to empower communities and create environments that enhance everyday life. By continuously raising the bar in project delivery and nurturing the next generation of industry professionals, we envision a future where Capstone stands as a symbol of quality, reliability, and progress.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StatCard({ number, label, icon }: { number: string, label: string, icon: React.ReactNode }) {
    return (
        <div className="p-4">
            {icon}
            <div className="text-4xl font-bold text-white mb-2">{number}</div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">{label}</div>
        </div>
    );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

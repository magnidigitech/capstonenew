"use client";

import { motion } from "framer-motion";
import { FlaskConical, Microscope, CheckCircle2, BadgeCheck, Beaker } from "lucide-react";
import Link from "next/link";

export default function LabPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex justify-center mb-6">
                            <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                                <BadgeCheck className="h-4 w-4" /> NABL Accredited
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Advanced Material Testing Lab
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                            Ensuring structural integrity through precision testing and scientific analysis. ISO/IEC 17025:2017 Certified.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-bold transition-all">
                                Book a Test
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Accreditation Info */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for NABL Logo - using text for now as specific logo might have copyright */}
                        <div className="text-2xl font-black text-gray-800 border-4 border-gray-800 p-4 rounded-lg">
                            NABL
                            <span className="block text-xs font-normal mt-1">ISO/IEC 17025:2017</span>
                        </div>
                        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
                        <p className="max-w-xl text-gray-600 text-left">
                            Our laboratory is fully accredited by the <span className="font-bold text-gray-900">National Accreditation Board for Testing and Calibration Laboratories (NABL)</span>, ensuring that all our test results meet international standards of accuracy and reliability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Comprehensive Testing Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We offer a wide range of destructive and non-destructive testing services for construction materials.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestCard
                            title="Concrete Technology"
                            icon={<BuildingBlock className="h-8 w-8" />}
                            tests={[
                                "Compressive Strength Test",
                                "Mix Design (M10 to M80)",
                                "Slump Cone & Flow Table Test",
                                "Rapid Chloride Permeability",
                                "Durability Testing"
                            ]}
                        />
                        <TestCard
                            title="Soil Mechanics"
                            icon={<Layers className="h-8 w-8" />}
                            tests={[
                                "Sieve Analysis",
                                "Atterberg Limits",
                                "Proctor Compaction",
                                "CBR Test",
                                "Direct Shear Test"
                            ]}
                        />
                        <TestCard
                            title="Steel & Metal"
                            icon={<DraftingCompass className="h-8 w-8" />}
                            tests={[
                                "Tensile Strength",
                                "Bend & Re-bend Test",
                                "Elongation %",
                                "Unit Weight Analysis",
                                "Chemical Composition"
                            ]}
                        />
                        <TestCard
                            title="Water Analysis"
                            icon={<FlaskConical className="h-8 w-8" />}
                            tests={[
                                "pH Value & Turbidity",
                                "Chlorides & Sulphates",
                                "Hardness & Alkalinity",
                                "TDS Analysis",
                                "Construction Suitability"
                            ]}
                        />
                        <TestCard
                            title="Non-Destructive Testing (NDT)"
                            icon={<Microscope className="h-8 w-8" />}
                            tests={[
                                "Rebound Hammer Test",
                                "Ultrasonic Pulse Velocity",
                                "Cover Meter Survey",
                                "Half Cell Potential",
                                "Core Extraction & Testing"
                            ]}
                        />
                        <TestCard
                            title="Aggregate Testing"
                            icon={<Beaker className="h-8 w-8" />}
                            tests={[
                                "Sieve Analysis",
                                "Impact & Crushing Value",
                                "Abrasion Test",
                                "Flakiness & Elongation",
                                "Specific Gravity"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-16">Testing Process</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <ProcessStep number="01" title="Sample Collection" desc="Expert collection of samples from site following IS code guidelines." />
                        <ProcessStep number="02" title="Lab Testing" desc="Precision testing using calibrated digital equipment." />
                        <ProcessStep number="03" title="Analysis" desc="Data analysis by senior structural engineers." />
                        <ProcessStep number="04" title="Digital Report" desc="Secure digital reports generated instantly for your records." />
                    </div>
                </div>
            </section>
        </div>
    );
}

function TestCard({ title, tests, icon }: { title: string, tests: string[], icon: React.ReactNode }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="bg-primary/5 w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
            <ul className="space-y-3">
                {tests.map((test, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                        {test}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative text-center group">
            <div className="text-6xl font-black text-gray-100 mb-4 group-hover:text-primary/10 transition-colors">{number}</div>
            <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

// Icons
import { Layers, DraftingCompass } from "lucide-react";

function BuildingBlock({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="8" x="2" y="2" rx="2" /><path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" /><path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" /><path d="M10 22H5a3 3 0 0 1-3-3v-3.5a2.5 2.5 0 0 1 2.5-2.5h2" /><path d="M18 22h-4a2 2 0 0 1-2-2V12" /></svg>
    )
}

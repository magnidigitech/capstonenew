"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Upload, Users, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

const jobs = [
    {
        id: 1,
        title: "Senior Civil Engineer",
        department: "Construction",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "5-8 years"
    },
    {
        id: 2,
        title: "Site Supervisor",
        department: "Operations",
        location: "Vijayawada, Andhra Pradesh",
        type: "Full-time",
        experience: "2-4 years"
    },
    {
        id: 3,
        title: "Structural Designer",
        department: "Engineering",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "3-5 years"
    },
    {
        id: 4,
        title: "Architectural Intern",
        department: "Design",
        location: "Remote / Hybrid",
        type: "Internship",
        experience: "Freshers"
    }
];

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative py-24 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Build Your Future With Us</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                            Join a team of innovators, engineers, and dreamers building the infrastructure of tomorrow.
                        </p>
                        <a href="#openings" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded font-bold transition-all">
                            View Open Positions
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm">Our Culture</span>
                        <h2 className="text-3xl font-bold text-primary mt-2">Why Join Capstone?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <CultureCard
                            icon={<TrendingUp className="h-8 w-8 text-secondary" />}
                            title="Growth & Learning"
                            desc="We invest in your professional development with workshops, certifications, and mentorship programs."
                        />
                        <CultureCard
                            icon={<Users className="h-8 w-8 text-secondary" />}
                            title="Collaborative Team"
                            desc="Work with industry experts in a supportive environment where every voice matters."
                        />
                        <CultureCard
                            icon={<Heart className="h-8 w-8 text-secondary" />}
                            title="Work-Life Balance"
                            desc="We believe in working hard and living well. Flexible policies to help you thrive."
                        />
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary">Current Openings</h2>
                            <p className="text-gray-600 mt-2">Become part of our growing family.</p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-primary mb-2">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <div className="text-sm font-semibold text-gray-900">Experience</div>
                                        <div className="text-sm text-gray-500">{job.experience}</div>
                                    </div>
                                    <Link href="/contact" className="bg-primary/10 hover:bg-primary hover:text-white text-primary px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2">
                                        Apply Now <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-primary rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Upload className="h-64 w-64 text-white" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t see a matching role?</h2>
                            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                                We are always looking for talented individuals. Send your resume to our HR department and we will contact you when a suitable position opens up.
                            </p>
                            <a href="mailto:careers@capstoneinfras.com" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                                <Upload className="h-5 w-5" /> Send Your CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CultureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-blue-100 transition-colors text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}

"use client";

import Image from "next/image";
import { Building2, Store, Warehouse, HeartPulse, GraduationCap, Briefcase } from "lucide-react";
import { ConstructionPackages } from "@/components/ConstructionPackages";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Services Header */}
            <section className="bg-primary py-20 text-white text-center">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Comprehensive Construction Solutions
                    </motion.h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        From residential dream homes to large-scale industrial complexes, we bring precision and expertise to every project.
                    </p>
                </div>
            </section>

            {/* B2C Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm">Residential</span>
                        <h2 className="text-3xl font-bold text-primary mt-2">B2C Construction Services</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard
                            image="https://images.unsplash.com/photo-1600596542815-60c37cabc38d?q=80&w=2070&auto=format&fit=crop"
                            title="Residential Construction"
                            description="Our construction company has talent and among the best in the field. Our designers and engineers ensure incredible apartment construction services without compromising the quality of technique and building materials."
                        />
                        <ServiceCard
                            image="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop"
                            title="Villa Construction"
                            description="Are you in search of a beautiful one or a mansion to create a large family home? We help you associate a flawless plan using house architecture plans to impress a weekend home."
                        />
                        <ServiceCard
                            image="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2078&auto=format&fit=crop"
                            title="Farmhouse Construction"
                            description="We know how important it is for you to get a unique and well-structured farmhouse. We offer a dedicated team to ensure personalized design needs are met without compromising quality."
                        />
                    </div>
                </div>
            </section>

            {/* House Plans Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Standard House Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <PlanCard
                            type="1 BHK House Plan"
                            size="~800 sq ft (30x30)"
                            details="Well-designed living room, kitchen, one bathroom and a large bedroom with comfortable interior."
                        />
                        <PlanCard
                            type="2 BHK House Plan"
                            size="1200 sq ft (30x40)"
                            details="Ideal for medium-sized families. Open living room, kitchen, dining area, and two bedrooms with bathrooms."
                            recommended
                        />
                        <PlanCard
                            type="3 BHK House Plan"
                            size="2400 sq ft (40x60)"
                            details="Spacious rooms capable of accommodating big families. Features living room, kitchen, master bedroom, and guest room."
                        />
                    </div>
                </div>
            </section>

            {/* Construction Packages Section */}
            <ConstructionPackages />

            {/* B2B Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm">Commercial & Industrial</span>
                        <h2 className="text-3xl font-bold text-primary mt-2">B2B Construction Services</h2>
                        <p className="text-gray-600 mt-4 max-w-3xl">
                            Partner with us to build commercial buildings. Expand your business through our flexible technologies. With over 500 contractors and 470+ quality checks, we are equipped to succeed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <B2BCard title="Commercial Construction" icon={<Building2 />} desc="Creating impeccable commercial spaces requiring intervention of industry experts." />
                        <B2BCard title="Warehouse Construction" icon={<Warehouse />} desc="Exceptional spaces designed to safeguard and preserve your valuable materials." />
                        <B2BCard title="Retail Construction" icon={<Store />} desc="Distinctive retail space designs by our highly-qualified team." />
                        <B2BCard title="Hospital Construction" icon={<HeartPulse />} desc="World-class hospital spaces meticulously designed for doctors and patients." />
                        <B2BCard title="Office Construction" icon={<Briefcase />} desc="Memorable guest-host environments that make customer experiences worth remembering." />
                        <B2BCard title="School Construction" icon={<GraduationCap />} desc="Efficient, earthquake-safe spaces that nurture bright minds." />
                    </div>
                </div>
            </section>

        </div>
    );
}

function ServiceCard({ title, description, image }: { title: string, description: string, image: string }) {
    return (
        <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
            <div className="h-48 overflow-hidden relative">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
            </div>
        </div>
    );
}

function PlanCard({ type, size, details, recommended }: { type: string, size: string, details: string, recommended?: boolean }) {
    return (
        <div className={`p-8 rounded-2xl border ${recommended ? 'border-secondary shadow-lg relative' : 'border-gray-200 bg-white'}`}>
            {recommended && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    POPULAR
                </span>
            )}
            <h3 className="text-2xl font-bold text-primary mb-2">{type}</h3>
            <div className="text-secondary font-semibold mb-4">{size}</div>
            <p className="text-gray-600 mb-6">{details}</p>

            {/* Wrap the button in a Link or turn the button into a Link styled like a button */}
            <Link href="/calculator" className="block">
                <button
                    className={`w-full py-3 rounded-lg font-bold transition-colors ${recommended
                        ? 'bg-secondary text-white hover:bg-secondary/90'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    View Plan Details
                </button>
            </Link>
        </div>
    );
}

function B2BCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:border-blue-100 bg-gray-50/50 hover:bg-white transition-all">
            <div className="bg-white p-3 rounded-lg h-fit text-secondary shadow-sm">{icon}</div>
            <div>
                <h4 className="font-bold text-primary mb-2">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </div>
    )
}

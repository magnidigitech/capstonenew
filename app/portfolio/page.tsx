"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, X, Calendar, User, Ruler } from "lucide-react";
import Image from "next/image";

// Portfolio Data
const projects = [
    {
        id: 1,
        title: "Luxury Villa Residence",
        category: "Residential",
        location: "Jubilee Hills, Hyderabad",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
        size: "4,500 sq ft",
        client: "Mr. Venkat Rao",
        completion: "Jan 2024",
        description: "A state-of-the-art luxury villa featuring contemporary architecture, smart home integration, and sustainable energy solutions. Built with premium materials and custom structural design to withstand seismic activity."
    },
    {
        id: 2,
        title: "Tech Park Commercial Complex",
        category: "Commercial",
        location: "Gachibowli, Hyderabad",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        size: "12,000 sq ft",
        client: "Nexus Solutions",
        completion: "Dec 2023",
        description: "A modern commercial complex designed for IT startups. Features open-plan workspaces, high-efficiency HVAC systems, and a glass facade optimized for natural light while minimizing heat gain."
    },
    {
        id: 3,
        title: "Modern Apartment Complex",
        category: "Residential",
        location: "Manikonda, Hyderabad",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        size: "25,000 sq ft",
        client: "Sunshine Developers",
        completion: "Nov 2023",
        description: "A 10-story apartment complex with 40 units. Structural design utilizes shear wall technology for rapid construction and superior stability. Includes amenities like a rooftop pool and gym."
    },
    {
        id: 4,
        title: "Industrial Warehouse",
        category: "Industrial",
        location: "Patancheru, Hyderabad",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
        size: "45,000 sq ft",
        client: "LogiTech Industries",
        completion: "Oct 2023",
        description: "Heavy-duty industrial warehouse with wide-span pre-engineered steel structure. Designed for heavy machinery loads and high-volume logistics operations with optimized dock levelers."
    },
    {
        id: 5,
        title: "Contemporary Office Interior",
        category: "Interiors",
        location: "Hitech City, Hyderabad",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        size: "5,000 sq ft",
        client: "Creative Digital Agency",
        completion: "Sep 2023",
        description: "Modern office interior combining industrial aesthetics with ergonomic design. Features exposed ceilings, custom joinery, and acoustic treatments for a productive work environment."
    },
    {
        id: 6,
        title: "Minimalist Farmhouse",
        category: "Residential",
        location: "Moinabad, Hyderabad",
        image: "https://images.unsplash.com/photo-1600596542815-60c37cabc38d?q=80&w=2070&auto=format&fit=crop",
        size: "3,200 sq ft",
        client: "Dr. Reddy",
        completion: "Aug 2023",
        description: "A serene farmhouse designed to blend with nature. Uses locally sourced stone and timber. Features large verandas and a courtyard layout for natural ventilation."
    },
    {
        id: 7,
        title: "Retail Showroom",
        category: "Commercial",
        location: "Banjara Hills, Hyderabad",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
        size: "2,800 sq ft",
        client: "Fashion Trends",
        completion: "Jul 2023",
        description: "Luxury retail space with high ceilings and custom lighting design. Structural modifications allowed for a column-free display area to maximize visual impact."
    }
];

const categories = ["All", "Residential", "Commercial", "Industrial", "Interiors"];

type Project = typeof projects[0];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <section className="bg-primary text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Our Portfolio
                    </motion.h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Showcasing our finest work across residential, commercial, and industrial sectors.
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                                ? "bg-primary text-white shadow-lg scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white text-primary px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                                            View Details <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                        {project.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                    <div className="flex items-center justify-between text-gray-500 text-sm">
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {project.location}</span>
                                        <span>{project.size}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl">No projects found in this category.</p>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20"
                            >
                                <X className="h-6 w-6 text-gray-900" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className="relative h-64 md:h-full min-h-[300px]">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                            {selectedProject.category}
                                        </span>
                                        <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                                        <p className="flex items-center gap-2 mt-2 text-gray-200">
                                            <MapPin className="h-4 w-4" /> {selectedProject.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Project Details</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Client</p>
                                                <p className="font-semibold">{selectedProject.client}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Ruler className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Size</p>
                                                <p className="font-semibold">{selectedProject.size}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">Completion</p>
                                                <p className="font-semibold">{selectedProject.completion}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">About Project</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {selectedProject.description}
                                    </p>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

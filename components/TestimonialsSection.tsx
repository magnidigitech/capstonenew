"use client";

import { useState, useEffect } from "react";
import { User, Quote } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
};

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.testimonials) {
                    setTestimonials(data.testimonials);
                }
            })
            .catch(err => console.error("Failed to load testimonials", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-primary text-white overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <Quote className="h-64 w-64 text-white rotate-180" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Testimonials</h2>
                    <h3 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h3>
                </div>

                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center hover:bg-white/20 transition-colors"
                        >
                            <div className="flex text-secondary mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-xl ${i < t.rating ? "text-secondary" : "text-gray-500"}`}>★</span>
                                ))}
                            </div>
                            <p className="text-gray-200 text-lg mb-6 italic leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{t.name}</h4>
                                    <p className="text-sm text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const newsItems = [
    {
        id: 1,
        title: "Capstone Infras Expands Operations to Vijayawada",
        category: "Expansion",
        date: "Feb 10, 2026",
        author: "Press Release",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        excerpt: "We are thrilled to announce our new regional office in Vijayawada, bringing our expert construction and engineering services closer to our clients in Andhra Pradesh."
    },
    {
        id: 2,
        title: "Adopting Green Concrete: A Step Towards Sustainability",
        category: "Innovation",
        date: "Jan 25, 2026",
        author: "Tech Team",
        image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=2025&auto=format&fit=crop",
        excerpt: "Capstone Infras commits to using eco-friendly low-carbon concrete for all upcoming residential projects, reducing our carbon footprint by 30%."
    },
    {
        id: 3,
        title: "Awarded 'Best Residential Builder 2025' by APDA",
        category: "Awards",
        date: "Jan 05, 2026",
        author: "Editorial",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
        excerpt: "We are honored to receive this prestigious recognition from the Andhra Pradesh Developers Association for our excellence in quality and timely delivery."
    },
    {
        id: 4,
        title: "Safety First: Achieving 1 Million Safe Man-Hours",
        category: "Safety",
        date: "Dec 15, 2025",
        author: "Safety Officer",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        excerpt: "A milestone achievement for our onsite teams. We celebrate our commitment to zero accidents and maintaining the highest safety standards."
    }
];

export default function NewsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="bg-white pt-20 pb-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Latest News & Updates</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Stay updated with Capstone&apos;s journey, industry insights, and company announcements.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* News Grid */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {newsItems.map((item, index) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                                        <Tag className="h-3 w-3" /> {item.category}
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {item.date}</span>
                                        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {item.author}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                        {item.excerpt}
                                    </p>
                                    <Link href={`/news/${item.id}`} className="text-secondary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        Read Full Story <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-blue-100 mb-8">Get the latest construction trends and company updates delivered to your inbox.</p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
                        />
                        <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

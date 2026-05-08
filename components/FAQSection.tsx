"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

export function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.faqs) {
                    setFaqs(data.faqs);
                }
            })
            .catch(err => console.error("Failed to load FAQs", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (faqs.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">FAQ</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors">
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex justify-between items-center p-6 text-left bg-gray-50/50 hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold text-primary text-lg">{faq.question}</span>
                                <span className={`p-2 rounded-full ${openId === faq.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                                    {openId === faq.id ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

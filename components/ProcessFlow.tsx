"use client";

import { MessageSquare, PhoneCall, Rocket, FileText, Home, HardHat } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        id: 1,
        title: "Raise Request",
        icon: MessageSquare,
        description: "Submit your project requirements online or via our app."
    },
    {
        id: 2,
        title: "Talk To Our Team",
        icon: PhoneCall,
        description: "Expert consultation to understand your vision and budget."
    },
    {
        id: 3,
        title: "Kickstart The Process",
        icon: Rocket,
        description: "Initial planning and site assessment."
    },
    {
        id: 4,
        title: "Design Presentation",
        icon: FileText,
        description: "Comprehensive architectural plans and 3D walkthroughs."
    },
    {
        id: 5,
        title: "Real Time Tracking",
        icon: HardHat,
        description: "Monitor progress daily via our mobile app."
    },
    {
        id: 6,
        title: "Welcome Home",
        icon: Home,
        description: "Final quality checks and key handover."
    },
];

export function ProcessFlow() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">How It Works</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-primary">Your Journey to a Dream Home</h3>
                </div>

                <div className="relative">
                    {/* Desktop Connecting Line (Dashed) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-secondary/30 group-hover:shadow-md transition-all relative z-10">
                                    <step.icon className="h-10 w-10 text-primary group-hover:text-secondary transition-colors" />
                                </div>
                                <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                                <p className="text-sm text-gray-500">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

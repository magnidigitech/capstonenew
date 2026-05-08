"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PackageItem = {
    name: string;
    details: string;
    rate: string;
};

type ConstructionPackage = {
    name: string;
    price: string;
    color: string;
    accentColor: string;
    items: Record<string, PackageItem>;
};

// Data Structure Optimized for Rows
const categories = [
    "Cement", "Bricks", "Steel", "Sand", "Flooring", "Painting", "Plumbing",
    "Electrical", "Exterior Work", "Bathroom", "Doors & Windows", "Lighting"
];

const packagesData: ConstructionPackage[] = [
    {
        name: "Essential",
        price: "₹2150/sft",
        color: "bg-blue-900",
        accentColor: "text-blue-900",
        items: {
            "Cement": { name: "Type", details: "UltraTech, ACC(OPC/PPC)", rate: "₹370/bag" },
            "Bricks": { name: "Type", details: "ACC Blocks, Red clay Bricks", rate: "₹7/brick" },
            "Steel": { name: "Brand", details: "Simhadri, Radha (Fe500D)", rate: "₹59/kg" },
            "Sand": { name: "Type", details: "Robo Sand, River Sand", rate: "₹45/cft" },
            "Flooring": { name: "Type", details: "Ceramic Tiles (Local Brands)", rate: "₹40/sft" },
            "Painting": { name: "Type", details: "Emulsion (Asian Paints)", rate: "₹22/sft" },
            "Plumbing": { name: "Type", details: "PVC (Finolex)", rate: "₹180/m" },
            "Electrical": { name: "Type", details: "Anchor Wiring", rate: "₹45/sft" },
            "Exterior Work": { name: "Type", details: "Standard Plastering", rate: "₹55/sft" },
            "Bathroom": { name: "Type", details: "CERA, Parryware", rate: "₹25k/unit" },
            "Doors & Windows": { name: "Type", details: "Aluminum, Local Timber", rate: "₹250/sft" },
            "Lighting": { name: "Fixtures", details: "Philips, Syska", rate: "₹2.5k/room" },
        }
    },
    {
        name: "Value Plus",
        price: "₹2450/sft",
        color: "bg-primary",
        accentColor: "text-primary",
        items: {
            "Cement": { name: "Type", details: "UltraTech, ACC Gold", rate: "₹390/bag" },
            "Bricks": { name: "Type", details: "ACC Blocks, Red clay", rate: "₹9/brick" },
            "Steel": { name: "Brand", details: "Vizag, MS Life", rate: "₹63/kg" },
            "Sand": { name: "Type", details: "River Sand (filtered)", rate: "₹50/cft" },
            "Flooring": { name: "Type", details: "Vitrified Tiles (Kajaria)", rate: "₹65/sft" },
            "Painting": { name: "Type", details: "Asian Royale, Nerolac", rate: "₹28/sft" },
            "Plumbing": { name: "Type", details: "uPVC (Astral)", rate: "₹220/m" },
            "Electrical": { name: "Type", details: "Legrand Modular", rate: "₹55/sft" },
            "Exterior Work": { name: "Type", details: "Textured Cladding", rate: "₹85/sft" },
            "Bathroom": { name: "Fittings", details: "Hindware, Jaguar", rate: "₹45k/unit" },
            "Doors & Windows": { name: "Type", details: "uPVC (Fenesta)", rate: "₹380/sft" },
            "Lighting": { name: "Fixtures", details: "Havells, Philips Hue", rate: "₹5k/room" },
        }
    },
    {
        name: "Signature",
        price: "₹3850/sft",
        color: "bg-secondary",
        accentColor: "text-secondary",
        items: {
            "Cement": { name: "Type", details: "Birla White, Premium", rate: "₹450/bag" },
            "Bricks": { name: "Type", details: "Wire-cut/Designer", rate: "₹15/brick" },
            "Steel": { name: "Brand", details: "Tata Tiscon, JSW", rate: "₹97/kg" },
            "Sand": { name: "Type", details: "Washed M-Sand", rate: "₹55/cft" },
            "Flooring": { name: "Type", details: "Italian Marble / Pergo", rate: "₹350/sft" },
            "Painting": { name: "Type", details: "Luxury (Dulux)", rate: "₹45/sft" },
            "Plumbing": { name: "Type", details: "Grohe, Viega", rate: "₹600/m" },
            "Electrical": { name: "Type", details: "Schneider, Automation", rate: "₹110/sft" },
            "Exterior Work": { name: "Type", details: "Designer Facades", rate: "₹250/sft" },
            "Bathroom": { name: "Fittings", details: "Toto, Villeroy & Boch", rate: "₹1L/unit" },
            "Doors & Windows": { name: "Type", details: "Teakwood, Smart", rate: "₹850/sft" },
            "Lighting": { name: "Fixtures", details: "Smart Automation", rate: "₹12k+/room" },
        }
    }
];

export function ConstructionPackages() {
    const [activeTab, setActiveTab] = useState("Value Plus");

    return (
        <section className="py-20 bg-gray-50 bg-opacity-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-secondary font-bold uppercase tracking-widest text-sm">Pricing Plans</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mt-3">Transparent Packages</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                        Choose the perfect construction package tailored to your needs. No hidden costs, just premium quality.
                    </p>
                </div>

                {/* Mobile View: Tabs + Detailed Card */}
                <div className="lg:hidden">
                    {/* Tabs */}
                    <div className="flex rounded-xl bg-white p-1 shadow-sm mb-8 overflow-x-auto">
                        {packagesData.map((pkg) => (
                            <button
                                key={pkg.name}
                                onClick={() => setActiveTab(pkg.name)}
                                className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === pkg.name
                                    ? `${pkg.color} text-white shadow-md`
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {pkg.name}
                            </button>
                        ))}
                    </div>

                    {/* Active Package Card */}
                    <AnimatePresence mode="wait">
                        {packagesData.map((pkg) => (
                            activeTab === pkg.name && (
                                <motion.div
                                    key={pkg.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                                >
                                    <div className={`${pkg.color} p-6 text-white text-center`}>
                                        <h3 className="text-2xl font-bold mb-1">{pkg.name} Package</h3>
                                        <div className="text-3xl font-bold mt-2">{pkg.price}</div>
                                        <p className="text-white/80 text-sm mt-2">GST as applicable</p>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {categories.map((cat) => (
                                            <div key={cat} className="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{cat}</span>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-gray-900 font-medium text-sm w-2/3">{pkg.items[cat].details}</span>
                                                    <span className={`text-xs font-bold ${pkg.accentColor} bg-gray-50 px-2 py-1 rounded`}>
                                                        {pkg.items[cat].rate}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 pt-0">
                                        <a href="/contact" className={`block w-full text-center py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 hover:shadow-xl ${pkg.color}`}>
                                            Get Started with {pkg.name}
                                        </a>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {/* Desktop View: Comparison Table */}
                <div className="hidden lg:block overflow-hidden rounded-3xl shadow-2xl border border-gray-100 bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="p-8 text-xl font-bold w-1/4 border-r border-gray-800">Features</th>
                                {packagesData.map((pkg) => (
                                    <th key={pkg.name} className={`p-8 text-center w-1/4 relative border-r border-gray-800 last:border-0`}>
                                        {pkg.name === "Value Plus" && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider">
                                                Most Popular
                                            </div>
                                        )}
                                        <div className="text-2xl font-bold">{pkg.name}</div>
                                        <div className="text-3xl font-bold mt-2 text-secondary">{pkg.price}</div>
                                        <div className="mt-4">
                                            <a href="/contact" className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors">
                                                Enquire
                                            </a>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, idx) => (
                                <tr key={cat} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 align-top">
                                        {cat}
                                    </td>
                                    {packagesData.map((pkg) => (
                                        <td key={`${pkg.name}-${cat}`} className="p-6 border-r border-gray-100 align-top last:border-0">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-gray-700 font-medium">{pkg.items[cat].details}</span>
                                                <span className="text-xs font-bold text-gray-400">{pkg.items[cat].rate}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-50">
                                <td className="p-6"></td>
                                {packagesData.map(pkg => (
                                    <td key={pkg.name} className="p-6 text-center border-r border-gray-200 last:border-0">
                                        <a href="/contact" className={`inline-block w-full py-3 rounded-lg font-bold text-white shadow-md hover:shadow-lg transition-all ${pkg.color}`}>
                                            Choose {pkg.name}
                                        </a>
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        </section>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Calculator, Send, CheckCircle2, AlertCircle, Building2, Ruler, MapPin, User, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration
const WHATSAPP_CONFIG = {
    businessNumber: '918977520918',
    businessName: 'Capstone Infras'
};

type MaterialSpec = {
    item: string;
    rate: string;
    description: string;
};

type PackageData = {
    id: number;
    name: string;
    price: number;
    materials: {
        [key: string]: MaterialSpec;
    };
};

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Outer component to handle Suspense boundary required for useSearchParams
export default function CalculatorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CalculatorContent />
        </Suspense>
    );
}

function CalculatorContent() {
    const searchParams = useSearchParams();
    const [inputs, setInputs] = useState({
        length: "",
        width: "",
        floors: "1",
        packageId: "",
        name: "",
        whatsapp: "",
        location: "",
        email: ""
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [packages, setPackages] = useState<Record<string, PackageData> | null>(null);
    const [packageFeatures, setPackageFeatures] = useState<Record<string, string[]> | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/pricing');
                if (res.ok) {
                    const data = await res.json();
                    setPackages(data.packages);
                    setPackageFeatures(data.packageFeatures);

                    // Set package from URL param if available
                    const pkgParam = searchParams.get("package");
                    if (pkgParam && data.packages[pkgParam]) {
                        setInputs(prev => ({ ...prev, packageId: pkgParam }));
                    }
                } else {
                    console.error("Failed to fetch pricing data");
                }
            } catch (error) {
                console.error("Failed to fetch pricing data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams]);

    // Derived state calculated during render
    const l = parseFloat(inputs.length) || 0;
    const w = parseFloat(inputs.width) || 0;
    const area = l * w;

    const isValid =
        parseFloat(inputs.length) > 0 &&
        parseFloat(inputs.width) > 0 &&
        inputs.packageId !== "" &&
        packages && // Ensure packages are loaded
        inputs.name.trim().length > 0 &&
        inputs.whatsapp.trim().length >= 10 &&
        inputs.location.trim().length > 0;

    const handleCalculate = async () => {
        if (!isValid || !packages) return;

        const floors = parseInt(inputs.floors);
        const baseArea = area;
        const totalArea = (baseArea * floors) + 100; // 100 sq ft headroom
        const packageData = packages[inputs.packageId];
        const totalCost = totalArea * packageData.price;

        const message = `🏗 CONSTRUCTION QUOTE REQUEST

📋 PROJECT DETAILS:
• Customer: ${inputs.name}
• Contact: ${inputs.whatsapp}
• Location: ${inputs.location}
${inputs.email ? `• Email: ${inputs.email}` : ''}
• Date: ${new Date().toLocaleDateString('en-IN')}

🏠 CONSTRUCTION SPECIFICATIONS:
• Length: ${inputs.length} ft
• Width: ${inputs.width} ft
• Base Area: ${baseArea.toFixed(0)} sq ft
• Floors: ${floors}
• Total Area: ${totalArea.toFixed(0)} sq ft (includes 100 sq ft headroom)

📦 SELECTED PACKAGE:
• ${packageData.name} Package
• Rate: ₹${packageData.price.toLocaleString()}/sq ft

💰 ESTIMATED COST:
• Total Cost: ₹${totalCost.toLocaleString('en-IN')}

📞 NEXT STEPS:
Please contact the customer for:
• Site survey and soil analysis
• Final quotation with detailed BOQ
• Timeline and construction schedule
• Payment terms discussion

This is an automated quote request from ${WHATSAPP_CONFIG.businessName} - Construction Cost Calculator`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.businessNumber}?text=${encodedMessage}`;

        setShowSuccess(true);

        // Submit to API
        try {
            await fetch("/api/form-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: inputs.name,
                    phone: inputs.whatsapp,
                    email: inputs.email,
                    location: inputs.location,
                    source: "Calculator",
                    packageId: packageData.id,
                    length: inputs.length,
                    width: inputs.width,
                    baseArea: baseArea,
                    floors: floors,
                    totalArea: totalArea,
                    estimatedCost: totalCost
                })
            });
        } catch (error) {
            console.error("Failed to store quote in DB:", error);
        }

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setShowSuccess(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pb-20 pt-10">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!packages || !packageFeatures) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pb-20 pt-10">
                <div className="text-center">
                    <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
                    <p className="text-gray-600">Failed to load pricing data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl border border-primary/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/5 p-4 rounded-full">
                            <Calculator className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3">
                        Construction Cost Calculator
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Get accurate estimates sent directly to your WhatsApp
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                            <Ruler className="h-6 w-6 text-secondary" /> Project Details
                        </h2>

                        <div className="space-y-6">
                            {/* Construction Area */}
                            <div>
                                <label className="block font-semibold text-primary mb-2">Construction Area</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        placeholder="Length (ft)"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50 transition-colors"
                                        value={inputs.length}
                                        onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Width (ft)"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50 transition-colors"
                                        value={inputs.width}
                                        onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                                    />
                                </div>
                                {area > 0 && (
                                    <div className="mt-3 bg-blue-50 border border-blue-100 p-3 rounded-xl flex justify-between items-center text-blue-900">
                                        <span className="text-sm font-medium">Area: <span className="font-bold text-lg">{area}</span> sq ft</span>
                                        <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-700">+100 sq ft headroom added</span>
                                    </div>
                                )}
                            </div>

                            {/* Floors */}
                            <div>
                                <label className="block font-semibold text-primary mb-2">Number of Floors</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setInputs({ ...inputs, floors: num.toString() })}
                                            className={`py-3 rounded-xl font-bold border-2 transition-all ${inputs.floors === num.toString()
                                                ? "border-secondary bg-secondary text-white"
                                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Package Selection */}
                            <div>
                                <label className="block font-semibold text-primary mb-2">Select Package</label>
                                <div className="space-y-3">
                                    {Object.entries(packages).map(([key, pkg]) => (
                                        <button
                                            key={key}
                                            onClick={() => setInputs({ ...inputs, packageId: key })}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center group ${inputs.packageId === key
                                                ? "border-primary bg-primary/5 shadow-md"
                                                : "border-gray-200 hover:border-primary/30"
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-bold ${inputs.packageId === key ? "text-primary" : "text-gray-700"}`}>
                                                    {pkg.name}
                                                </div>
                                                <div className="text-sm text-gray-500 group-hover:text-gray-700">
                                                    {packageFeatures[key].slice(0, 2).join(", ")}...
                                                </div>
                                            </div>
                                            <div className={`text-lg font-bold ${inputs.packageId === key ? "text-secondary" : "text-gray-400"}`}>
                                                ₹{pkg.price}/sft
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            {/* Contact Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-semibold text-primary mb-1">Your Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50"
                                            value={inputs.name}
                                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-primary mb-1">WhatsApp Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50"
                                            value={inputs.whatsapp}
                                            onChange={(e) => setInputs({ ...inputs, whatsapp: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-1 flex items-center gap-1">
                                        <Building2 className="h-3 w-3" /> We&apos;ll send the quote to this number
                                    </p>
                                </div>

                                <div>
                                    <label className="block font-semibold text-primary mb-1">Project Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="City, Area"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50"
                                            value={inputs.location}
                                            onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold text-primary mb-1">Email <span className="text-gray-400 text-sm font-normal">(Optional)</span></label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary focus:ring-0 bg-gray-50"
                                            value={inputs.email}
                                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </div>

                            <button
                                disabled={!isValid}
                                onClick={handleCalculate}
                                className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary to-gray-900"
                            >
                                Send Quote to WhatsApp <Send className="h-5 w-5" />
                            </button>

                        </div>
                    </div>

                    {/* Package Details Section */}
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            {inputs.packageId ? (
                                <motion.div
                                    key={inputs.packageId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 h-full"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-sm font-bold text-secondary uppercase tracking-widest">Selected Package</span>
                                            <h2 className="text-3xl font-bold text-primary">{packages[inputs.packageId].name}</h2>
                                        </div>
                                        <div className="bg-primary/5 px-4 py-2 rounded-lg text-primary font-bold">
                                            ₹{packages[inputs.packageId].price}/sft
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-3">Included Highlights:</h3>
                                        <ul className="space-y-2">
                                            {packageFeatures[inputs.packageId].map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Material Specs */}
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Building2 className="h-5 w-5 text-gray-400" /> Material Specifications
                                        </h3>
                                        <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.entries(packages[inputs.packageId].materials).map(([key, item]) => (
                                                <div key={key} className="p-4 rounded-xl border border-gray-100 hover:border-secondary/30 hover:bg-red-50/10 transition-colors group">
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{key}</h4>
                                                    <div className="flex justify-between items-start">
                                                        <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">{item.item}</div>
                                                        <div className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{item.rate}</div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-gray-100 rounded-3xl p-8 border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-center text-gray-400"
                                >
                                    <AlertCircle className="h-16 w-16 mb-4 opacity-20" />
                                    <h3 className="text-xl font-bold mb-2">No Package Selected</h3>
                                    <p>Select a package from the left to view detailed specifications and material breakdown.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                            <p className="text-gray-500 mb-6">Redirecting you to WhatsApp to send the quote...</p>
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

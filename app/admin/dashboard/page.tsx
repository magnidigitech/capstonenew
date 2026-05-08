"use client";

import { useState, useEffect } from "react";
import { Save, LogOut, Loader2, CheckCircle2, Plus, Trash2, Users, FileText, Calendar, MapPin, Phone, Mail, ExternalLink } from "lucide-react";

// --- Types ---

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

type PricingData = {
    packages: Record<string, PackageData>;
    packageFeatures: Record<string, string[]>;
};

type Testimonial = {
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
};

type FAQ = {
    id: string;
    question: string;
    answer: string;
};

type ContentData = {
    testimonials: Testimonial[];
    faqs: FAQ[];
};

type Customer = {
    id: number;
    name: string;
    phone: string;
    email: string;
    location: string;
    created_at: string;
    latest_source: string;
    request_count: number;
};

// --- Main Component ---

import { useRouter as useNextRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useNextRouter();
    const [activeTab, setActiveTab] = useState<"pricing" | "testimonials" | "faqs" | "customers">("pricing");

    // State for Pricing
    const [pricingData, setPricingData] = useState<PricingData | null>(null);

    // State for Content (Testimonials & FAQs)
    const [contentData, setContentData] = useState<ContentData | null>(null);

    // State for Customers
    const [customersData, setCustomersData] = useState<Customer[]>([]);

    // Global UI State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [pricingRes, contentRes, customersRes] = await Promise.all([
                fetch("/api/pricing"),
                fetch("/api/content"),
                fetch("/api/admin/customers")
            ]);

            if (pricingRes.ok) setPricingData(await pricingRes.json());
            if (contentRes.ok) setContentData(await contentRes.json());
            if (customersRes.ok) setCustomersData(await customersRes.json());
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePricing = async () => {
        if (!pricingData) return;
        setSaving(true);
        try {
            // Updated to support MySQL-backed API which might require separate calls or a unified save
            // For now, let's stick to the current pattern but iterate over packages
            const promises = Object.values(pricingData.packages).map(pkg => {
                const features = pricingData.packageFeatures[pkg.name.toLowerCase()];
                return fetch("/api/pricing", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: pkg.id,
                        package_name: pkg.name,
                        rate_per_sqft: pkg.price,
                        features: features,
                        materials_json: pkg.materials
                    }),
                });
            });

            const results = await Promise.all(promises);
            if (results.every(r => r.ok)) showSuccess();
            else alert("Failed to save some pricing data");
        } catch (error) {
            console.error("Error saving pricing:", error);
            alert("Error saving pricing");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveContent = async () => {
        if (!contentData) return;
        setSaving(true);
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contentData),
            });
            if (res.ok) showSuccess();
            else alert("Failed to save content");
        } catch (error) {
            console.error("Error saving content:", error);
            alert("Error saving content");
        } finally {
            setSaving(false);
        }
    };

    const showSuccess = () => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    // --- Pricing Helpers ---
    const updatePrice = (pkgKey: string, price: number) => {
        if (!pricingData) return;
        setPricingData({
            ...pricingData,
            packages: {
                ...pricingData.packages,
                [pkgKey]: { ...pricingData.packages[pkgKey], price },
            },
        });
    };

    const updateMaterialRate = (pkgKey: string, materialKey: string, rate: string) => {
        if (!pricingData) return;
        setPricingData({
            ...pricingData,
            packages: {
                ...pricingData.packages,
                [pkgKey]: {
                    ...pricingData.packages[pkgKey],
                    materials: {
                        ...pricingData.packages[pkgKey].materials,
                        [materialKey]: { ...pricingData.packages[pkgKey].materials[materialKey], rate }
                    },
                },
            },
        });
    };

    // --- Content Helpers ---
    const addTestimonial = () => {
        if (!contentData) return;
        const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            name: "New Client",
            role: "Role",
            text: "Client feedback...",
            rating: 5
        };
        setContentData({ ...contentData, testimonials: [...contentData.testimonials, newTestimonial] });
    };

    const updateTestimonial = (id: string, field: keyof Testimonial, value: string | number) => {
        if (!contentData) return;
        setContentData({
            ...contentData,
            testimonials: contentData.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t)
        });
    };

    const deleteTestimonial = (id: string) => {
        if (!contentData) return;
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        setContentData({
            ...contentData,
            testimonials: contentData.testimonials.filter(t => t.id !== id)
        });
    };

    const addFAQ = () => {
        if (!contentData) return;
        const newFAQ: FAQ = {
            id: Date.now().toString(),
            question: "New Question?",
            answer: "New Answer."
        };
        setContentData({ ...contentData, faqs: [...contentData.faqs, newFAQ] });
    };

    const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
        if (!contentData) return;
        setContentData({
            ...contentData,
            faqs: contentData.faqs.map(f => f.id === id ? { ...f, [field]: value } : f)
        });
    };

    const deleteFAQ = (id: string) => {
        if (!contentData) return;
        if (!confirm("Delete this FAQ?")) return;
        setContentData({
            ...contentData,
            faqs: contentData.faqs.filter(f => f.id !== id)
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!pricingData || !contentData) return <div className="p-8 text-center">Failed to load data</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        {success && (
                            <span className="text-green-600 flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                <CheckCircle2 className="h-4 w-4" /> Saved Successfully
                            </span>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-200">
                    <TabButton active={activeTab === "pricing"} onClick={() => setActiveTab("pricing")} label="Pricing" icon={<FileText className="h-4 w-4" />} />
                    <TabButton active={activeTab === "customers"} onClick={() => setActiveTab("customers")} label="Customers" icon={<Users className="h-4 w-4" />} />
                    <TabButton active={activeTab === "testimonials"} onClick={() => setActiveTab("testimonials")} label="Testimonials" icon={<CheckCircle2 className="h-4 w-4" />} />
                    <TabButton active={activeTab === "faqs"} onClick={() => setActiveTab("faqs")} label="FAQs" icon={<CheckCircle2 className="h-4 w-4" />} />
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab} Management</h2>
                    {activeTab !== "customers" && (
                        <button
                            onClick={activeTab === "pricing" ? handleSavePricing : handleSaveContent}
                            disabled={saving}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Changes
                        </button>
                    )}
                </div>

                {/* CUSTOMERS TAB */}
                {activeTab === "customers" && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Latest Activity</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Location</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {customersData.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                No customer records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        customersData.map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{c.name}</div>
                                                    <div className="text-xs text-gray-400">{c.request_count} total requests</div>
                                                </td>
                                                <td className="px-6 py-4 space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="h-3 w-3" /> {c.phone}
                                                    </div>
                                                    {c.email && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Mail className="h-3 w-3" /> {c.email}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.latest_source === 'Calculator' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {c.latest_source || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="h-3 w-3" /> {c.location || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(c.created_at).toLocaleDateString('en-IN')}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* PRICING TAB */}
                {activeTab === "pricing" && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {Object.entries(pricingData.packages).map(([pkgKey, pkg]) => (
                            <div key={pkgKey} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 p-6 border-b border-gray-100">
                                    <h3 className="text-xl font-bold text-primary mb-2">{pkg.name} Package</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-600 text-sm">Base Price (₹/sft):</span>
                                        <input
                                            type="number"
                                            value={pkg.price}
                                            onChange={(e) => updatePrice(pkgKey, parseInt(e.target.value) || 0)}
                                            className="w-24 px-2 py-1 rounded border border-gray-300 focus:ring-primary focus:border-primary text-right font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 max-h-[600px] overflow-y-auto">
                                    <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Material Rates</h4>
                                    <div className="space-y-4">
                                        {Object.entries(pkg.materials).map(([matKey, mat]) => (
                                            <div key={matKey} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium capitalize text-gray-700">{matKey}</span>
                                                    <input
                                                        type="text"
                                                        value={mat.rate}
                                                        onChange={(e) => updateMaterialRate(pkgKey, matKey, e.target.value)}
                                                        className="w-32 px-2 py-1 rounded border border-gray-200 text-right text-xs font-mono"
                                                    />
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">{mat.item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* TESTIMONIALS TAB */}
                {activeTab === "testimonials" && (
                    <div className="space-y-6">
                        <button onClick={addTestimonial} className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20">
                            <Plus className="h-5 w-5" /> Add Testimonial
                        </button>
                        <div className="grid md:grid-cols-2 gap-6">
                            {contentData.testimonials.map((t) => (
                                <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                    <button onClick={() => deleteTestimonial(t.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={t.name}
                                            onChange={(e) => updateTestimonial(t.id, "name", e.target.value)}
                                            placeholder="Client Name"
                                            className="w-full font-bold text-lg border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none bg-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={t.role}
                                            onChange={(e) => updateTestimonial(t.id, "role", e.target.value)}
                                            placeholder="Role / Location"
                                            className="w-full text-sm text-gray-500 border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none bg-transparent"
                                        />
                                        <textarea
                                            value={t.text}
                                            onChange={(e) => updateTestimonial(t.id, "text", e.target.value)}
                                            placeholder="Testimonial text..."
                                            rows={3}
                                            className="w-full text-gray-700 bg-gray-50 p-3 rounded-lg text-sm border-transparent focus:border-primary focus:ring-0"
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-600">Rating:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={t.rating}
                                                onChange={(e) => updateTestimonial(t.id, "rating", parseInt(e.target.value))}
                                                className="w-16 px-2 py-1 rounded border border-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQS TAB */}
                {activeTab === "faqs" && (
                    <div className="space-y-6">
                        <button onClick={addFAQ} className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors border border-primary/20">
                            <Plus className="h-5 w-5" /> Add FAQ
                        </button>
                        <div className="space-y-4">
                            {contentData.faqs.map((f) => (
                                <div key={f.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                    <button onClick={() => deleteFAQ(f.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <div className="space-y-3 pr-8">
                                        <input
                                            type="text"
                                            value={f.question}
                                            onChange={(e) => updateFAQ(f.id, "question", e.target.value)}
                                            placeholder="Question"
                                            className="w-full font-bold text-gray-900 border-b border-transparent hover:border-gray-200 focus:border-primary focus:outline-none bg-transparent"
                                        />
                                        <textarea
                                            value={f.answer}
                                            onChange={(e) => updateFAQ(f.id, "answer", e.target.value)}
                                            placeholder="Answer"
                                            rows={2}
                                            className="w-full text-gray-600 bg-gray-50 p-3 rounded-lg text-sm border-transparent focus:border-primary focus:ring-0"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

function TabButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${active ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

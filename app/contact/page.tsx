"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "Structural Design",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            const res = await fetch("/api/form-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    projectType: formData.projectType,
                    message: formData.message,
                    source: "Contact Form"
                })
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ firstName: "", lastName: "", email: "", phone: "", projectType: "Structural Design", message: "" });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">Get in Touch</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-lg">
                Feel free to reach out to us for any inquiries or assistance. We&apos;re here to help you find your perfect space.
            </p>

            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <select
                                    className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20 text-gray-500"
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                >
                                    <option>Structural Design</option>
                                    <option>Audit</option>
                                    <option>Testing</option>
                                </select>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    required
                                    className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 text-sm">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Something went wrong. Please try again.</span>
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Head Office</h3>
                        <div className="flex items-start gap-4 text-gray-600">
                            <MapPin className="h-6 w-6 text-secondary shrink-0 mt-1" />
                            <p>Ratnapuri colony, 33-4-316, 4th Ln, Kavitha Nagar,<br />Vengalarao Nagar, Mallikarjunpet, Guntur,<br />Andhra Pradesh 522002</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Details</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex items-center gap-4">
                                <Phone className="h-6 w-6 text-secondary shrink-0" />
                                <p>+91-8977520918</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-6 w-6 text-secondary shrink-0" />
                                <p>Info.capstoneinfras@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locations Section */}
            <section className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-primary mb-6">Serving Major Cities in Andhra Pradesh</h2>
                <p className="text-gray-600 max-w-4xl mx-auto mb-12">
                    We offer premium house construction services across Major Cities in Andhra Pradesh. Our team specializes in delivering modern, durable, and aesthetically appealing homes tailored to each city&apos;s unique environment and lifestyle.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Tirupati", "Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Anantapur", "Kadapa", "Ongole"].map((city) => (
                        <span key={city} className="px-6 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-primary hover:text-white transition-colors cursor-default">
                            {city}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
}


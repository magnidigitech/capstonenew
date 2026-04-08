import { Metadata } from "next";
import { ConstructionPackages } from "@/components/ConstructionPackages";
import { FAQSection } from "@/components/FAQSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Pricing Packages | Capstone Infras",
    description: "Transparent construction packages tailored to your needs. Choose from Essential, Value Plus, and Signature packages with no hidden costs.",
};

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}

            {/* Main Pricing Component */}
            <ConstructionPackages />

            {/* Why Our Pricing Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">No Hidden Costs</h3>
                            <p className="text-gray-600">
                                Every detail is documented. What you see in our package is exactly what you get, with a clear breakdown of material rates.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">Quality Assurance</h3>
                            <p className="text-gray-600">
                                We use only standardized, branded materials. Each package guarantees a minimum of 470+ quality checks during construction.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">Tech-Enabled Tracking</h3>
                            <p className="text-gray-600">
                                Monitor every rupee spent and every milestone achieved through our mobile app, available on both iOS and Android.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* Final CTA */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-6">Still have questions?</h2>
                    <p className="text-gray-600 mb-10 max-w-xl mx-auto">
                        Our experts are ready to help you choose the right package for your dream home or commercial project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all"
                        >
                            Talk to an Expert
                        </Link>
                        <Link
                            href="/calculator"
                            className="bg-white hover:bg-gray-50 text-primary border border-gray-200 px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                        >
                            Calculate Exact Cost <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

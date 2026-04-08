"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Building2, HardHat, FileCheck, ShieldCheck, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ProcessFlow } from "@/components/ProcessFlow";
import { BrandScroll } from "@/components/BrandScroll";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* ... (Hero content unchanged) ... */}
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Do you <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Own a Plot?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
              We will build your dream home with precision and quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/portfolio"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                View Our Portfolio <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/calculator"
                className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded font-semibold transition-all"
              >
                Get Instant Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <StatsCard number="30+" label="Months Experience" />
            <StatsCard number="500+" label="Contractors Team" />
            <StatsCard number="470+" label="Quality Checks" />
            <StatsCard number="100%" label="Tech Enabled" />
          </div>
        </div>
      </section>

      {/* Brand Scroll Section */}
      <BrandScroll />

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary">Comprehensive Construction Solutions</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Building2 className="h-10 w-10 text-secondary" />}
              title="Civil & Structural Design"
              description="Optimized structural designs focusing on safety, economy, and durability for all building types."
            />
            <ServiceCard
              icon={<ShieldCheck className="h-10 w-10 text-secondary" />}
              title="Structural Audit & Retrofitting"
              description="Detailed health assessment of existing structures with retrofitting solutions to extend lifespan."
            />
            <ServiceCard
              icon={<FileCheck className="h-10 w-10 text-secondary" />}
              title="NABL Lab Testing (NDT)"
              description="Advanced Non-Destructive Testing services with NABL accreditation for precise material analysis."
            />
            <ServiceCard
              icon={<HardHat className="h-10 w-10 text-secondary" />}
              title="Project Management"
              description="End-to-end project management ensuring timely delivery and quality control at every stage."
            />
            <ServiceCard
              icon={<CheckCircle className="h-10 w-10 text-secondary" />}
              title="Solar & Wind Engineering"
              description="Specialized foundation and structural design for renewable energy infrastructure projects."
            />
            <ServiceCard
              icon={<ArrowRight className="h-10 w-10 text-secondary" />}
              title="View All Services"
              description="Explore our full range of engineering and construction services."
              link="/services"
            />
          </div>
        </div>
      </section>

      {/* Process Flow Component */}
      <ProcessFlow />

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-2xl">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary/10 p-3 rounded-full"><PlayCircle className="h-8 w-8 text-primary" /></div>
                  <div>
                    <p className="font-bold text-gray-900">Tech-Enabled</p>
                    <p className="text-xs text-gray-500">Track on Mobile App</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Why Choose Us?</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">India&apos;s No.1 Tech-Enabled Construction Company</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are an authentic, reliable, and trusted construction company with over 500+ quality checks per floor. Our credibility is unmatched. We use the most technologically advanced methods with over 30 field teams.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With apps exclusively available on the Google Play Store and Apple App Store, you can experience every aspect of home construction right next to you. From real-time project tracking to easy choices and payment scheduling, everything is available on your phone for free.
              </p>
              <ul className="space-y-4">
                <FeatureItem text="500+ Quality Checks per Floor" />
                <FeatureItem text="Tech-Enabled Real-Time Tracking" />
                <FeatureItem text="Over 30 Expert Field Teams" />
                <FeatureItem text="Standardized Construction Materials" />
              </ul>
              <Link href="/calculator" className="inline-block mt-8 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-semibold transition-colors">
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Contact us today for a structural audit or a quote for your upcoming construction project.
          </p>
          <Link
            href="/calculator"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 py-5 rounded font-bold text-lg transition-all inline-block"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatsCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-sm text-gray-300 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function ServiceCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string, link?: string }) {
  const Wrapper = link ? Link : "div";
  return (

    <Wrapper href={link || "#"} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="mb-6 p-3 bg-gray-50 rounded-lg inline-block group-hover:bg-primary/5 transition-colors">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{title}</h4>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      {link && <div className="text-secondary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight className="h-4 w-4" /></div>}
    </Wrapper>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
        <CheckCircle className="h-4 w-4 text-secondary" />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </li>
  );
}

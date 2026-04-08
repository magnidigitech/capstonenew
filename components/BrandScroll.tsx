"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Brand list based on your folder screenshot.
 * The 'name' must match the filename in /public/brands/ exactly.
 */
const brands = [

    { name: "UltraTech Cement", domain: "ultratechcement.com" },

    { name: "Tata Steel", domain: "tatasteel.com" },

    { name: "Asian Paints", domain: "asianpaints.com" },

    { name: "Berger Paints", domain: "bergerpaints.com" },

    { name: "JSW Steel", domain: "jsw.in" },

    { name: "Kajaria", domain: "kajariaceramics.com" },

    { name: "Astral Pipes", domain: "astralpipes.com" },

    { name: "Polycab", domain: "polycab.com" },

    { name: "Havells", domain: "havells.com" },

    { name: "Philips", domain: "philips.com" },

    { name: "Schneider Electric", domain: "se.com" },

    { name: "Ashirvad Pipes", domain: "ashirvad.com" },

    { name: "Saint-Gobain", domain: "saint-gobain.com" },

    { name: "Jaquar", domain: "jaquar.com" },

    { name: "Hindware", domain: "hindware.com" },

    { name: "ACC Cement", domain: "acclimited.com" },

    { name: "Nerolac", domain: "nerolac.com" },

    { name: "Pidilite", domain: "pidilite.com" },

];

function BrandItem({ name }: { name: string }) {
    const imagePath = `/brands/${name}.png`;

    return (
        <div className="relative h-20 w-44 flex-shrink-0 flex items-center justify-center px-6 transition-transform duration-300 hover:scale-110">
            <Image
                src={imagePath}
                alt={`${name} Logo`}
                width={180}
                height={80}
                className="max-h-14 w-auto object-contain pointer-events-none"
            />
        </div>
    );
}

export function BrandScroll() {
    return (
        <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
            {/* Section Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <p className="text-[11px] font-black text-primary uppercase tracking-[0.5em] mb-4">
                    Our Trusted Partners
                </p>
                <div className="h-1 w-12 bg-primary/10 mx-auto rounded-full"></div>
            </div>

            {/* Scrolling Track */}
            <div className="flex relative overflow-hidden">
                {/* Visual Depth Masks (Fades the edges) */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex gap-16 md:gap-28 items-center py-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Render list twice for infinite loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <BrandItem key={`${brand.name}-${index}`} name={brand.name} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
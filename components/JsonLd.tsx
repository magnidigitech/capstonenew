export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://capstone-infras.com/#organization",
                "name": "Capstone Infras",
                "url": "https://capstone-infras.com",
                "logo": "https://capstone-infras.com/logo.png",
                "sameAs": [
                    "https://www.facebook.com/capstoneinfras",
                    "https://www.instagram.com/capstoneinfras",
                    "https://www.linkedin.com/company/capstoneinfras"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9876543210",
                    "contactType": "customer service",
                    "areaServed": ["IN-AP", "IN-TG"],
                    "availableLanguage": ["en", "te", "hi"]
                }
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://capstone-infras.com/#localbusiness",
                "name": "Capstone Infras",
                "image": "https://capstone-infras.com/images/hero.png",
                "telephone": "+91-9876543210",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Guntur",
                    "addressLocality": "Guntur",
                    "addressRegion": "Andhra Pradesh",
                    "postalCode": "522001",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 16.3067,
                    "longitude": 80.4365
                },
                "url": "https://capstone-infras.com",
                "priceRange": "₹₹₹",
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "09:00",
                        "closes": "20:00"
                    }
                ]
            },
            {
                "@type": "Service",
                "serviceType": "Construction Services",
                "provider": {
                    "@id": "https://capstone-infras.com/#organization"
                },
                "areaServed": [
                    {
                        "@type": "State",
                        "name": "Andhra Pradesh"
                    },
                    {
                        "@type": "State",
                        "name": "Telangana"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Construction Packages",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Essential Package"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Value Plus Package"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Signature Package"
                            }
                        }
                    ]
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

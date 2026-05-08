import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data', 'pricing.json');

/**
 * GET handler for Pricing.
 * Loads directly from data/pricing.json with normalized keys.
 */
export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        const normalizedPackages: Record<string, any> = {};
        const normalizedFeatures: Record<string, string[]> = {};

        Object.entries(data.packages).forEach(([key, pkg]: [string, any]) => {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            normalizedPackages[normalizedKey] = {
                id: normalizedKey, // Use the normalized key as the unique ID for updates
                ...pkg
            };
        });

        Object.entries(data.packageFeatures).forEach(([key, features]: [string, any]) => {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            normalizedFeatures[normalizedKey] = features;
        });

        return NextResponse.json({
            packages: normalizedPackages,
            packageFeatures: normalizedFeatures
        });
    } catch (error: any) {
        console.error('[API] Pricing GET Error:', error.message);
        return NextResponse.json({ error: 'Failed to read pricing data' }, { status: 500 });
    }
}

/**
 * POST handler for Pricing.
 * Safely writes the updated pricing and features back to data/pricing.json.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { package_name, rate_per_sqft, features, materials_json } = body;

        const normalizedKey = package_name.toLowerCase().replace(/\s+/g, '');

        // 1. Read the current contents of the static JSON file
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        // 2. Update the matching package's price and materials
        if (data.packages[normalizedKey]) {
            data.packages[normalizedKey].price = Number(rate_per_sqft);
            
            if (materials_json) {
                const materials = typeof materials_json === 'string' ? JSON.parse(materials_json) : materials_json;
                data.packages[normalizedKey].materials = materials;
            }
        }

        // 3. Update the matching package's features array
        if (data.packageFeatures && features) {
            const featuresList = typeof features === 'string' ? JSON.parse(features) : features;
            data.packageFeatures[normalizedKey] = featuresList;
        }

        // 4. Safely write the updated JSON object back to disk
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`[API] Static pricing.json updated successfully for package: ${normalizedKey}`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[API] Pricing POST Error:', error.message);
        return NextResponse.json({ error: 'Failed to write pricing updates to disk' }, { status: 500 });
    }
}

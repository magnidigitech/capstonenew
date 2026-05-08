import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * Standard GET handler for Pricing.
 * Loads from static JSON for 100% availability on Hostinger.
 */
export async function GET() {
    try {
        const dataFilePath = path.join(process.cwd(), 'data', 'pricing.json');
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        const normalizedPackages: Record<string, any> = {};
        const normalizedFeatures: Record<string, string[]> = {};

        Object.entries(data.packages).forEach(([key, pkg]: [string, any]) => {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            normalizedPackages[normalizedKey] = pkg;
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
        return NextResponse.json({ error: 'Data source is temporarily unavailable' }, { status: 503 });
    }
}

/**
 * POST handler for Admin Pricing updates.
 * PERSISTS to MySQL for the Admin Dashboard.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, package_name, rate_per_sqft, features, materials_json } = body;

        if (id) {
            await query(
                'UPDATE packages SET package_name = ?, rate_per_sqft = ?, features = ?, materials_json = ? WHERE id = ?',
                [package_name, rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json), id]
            );
        } else {
            await query(
                'INSERT INTO packages (package_name, rate_per_sqft, features, materials_json) VALUES (?, ?, ?, ?)',
                [package_name, rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json)]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[API] Pricing POST Error:', error.message);
        return NextResponse.json({ error: 'Failed to update pricing records' }, { status: 500 });
    }
}

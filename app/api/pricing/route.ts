import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * GET handler for Pricing.
 * Dynamic database-backed loading with a static JSON fallback for 100% reliability.
 */
export async function GET() {
    try {
        // 1. Try fetching pricing from the database first
        try {
            const dbPackages: any = await query('SELECT * FROM packages');
            if (dbPackages && dbPackages.length > 0) {
                const normalizedPackages: Record<string, any> = {};
                const normalizedFeatures: Record<string, string[]> = {};

                dbPackages.forEach((row: any) => {
                    const normalizedKey = row.package_name.toLowerCase().replace(/\s+/g, '');
                    
                    let materials = {};
                    try {
                        materials = typeof row.materials_json === 'string' ? JSON.parse(row.materials_json) : row.materials_json;
                    } catch (e) {
                        materials = row.materials_json || {};
                    }

                    let featuresList = [];
                    try {
                        featuresList = typeof row.features === 'string' ? JSON.parse(row.features) : row.features;
                    } catch (e) {
                        featuresList = row.features || [];
                    }

                    normalizedPackages[normalizedKey] = {
                        id: row.id,
                        name: row.package_name,
                        price: Number(row.rate_per_sqft),
                        materials: materials
                    };

                    normalizedFeatures[normalizedKey] = featuresList;
                });

                console.log('[API] Pricing fetched from Database.');
                return NextResponse.json({
                    packages: normalizedPackages,
                    packageFeatures: normalizedFeatures
                });
            }
        } catch (dbError: any) {
            console.warn('[API] Database pricing fetch failed or tables empty. Falling back to static JSON.', dbError.message);
        }

        // 2. Fallback: Load from static JSON
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

        console.log('[API] Pricing fetched from Static JSON fallback.');
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
 * Persists to MySQL with name-based upsert logic to prevent duplicates.
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
            // Check if a package with the same name already exists to prevent duplicate rows on initial save
            const existing: any = await query('SELECT id FROM packages WHERE LOWER(package_name) = ?', [package_name.toLowerCase()]);
            if (existing && existing.length > 0) {
                await query(
                    'UPDATE packages SET rate_per_sqft = ?, features = ?, materials_json = ? WHERE id = ?',
                    [rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json), existing[0].id]
                );
            } else {
                await query(
                    'INSERT INTO packages (package_name, rate_per_sqft, features, materials_json) VALUES (?, ?, ?, ?)',
                    [package_name, rate_per_sqft, JSON.stringify(features), JSON.stringify(materials_json)]
                );
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[API] Pricing POST Error:', error.message);
        return NextResponse.json({ error: 'Failed to update pricing records' }, { status: 500 });
    }
}

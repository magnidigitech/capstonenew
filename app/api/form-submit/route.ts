import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            phone,
            email,
            location,
            source, // 'Contact Form' or 'Calculator'
            packageId,
            length,
            width,
            baseArea,
            floors,
            totalArea,
            estimatedCost
        } = body;

        // Basic Validation
        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
        }

        // 1. Check/Create Customer
        // Using phone as unique identifier for customers
        const customerResult: any = await query(
            'SELECT id FROM customers WHERE phone = ?',
            [phone]
        );

        let customerId;
        if (customerResult.length > 0) {
            customerId = customerResult[0].id;
            // Update email/location if provided and missing
            await query(
                'UPDATE customers SET name = ?, email = COALESCE(?, email), location = COALESCE(?, location) WHERE id = ?',
                [name, email, location, customerId]
            );
        } else {
            const insertCustomer: any = await query(
                'INSERT INTO customers (name, phone, email, location) VALUES (?, ?, ?, ?)',
                [name, phone, email, location]
            );
            customerId = insertCustomer.insertId;
        }

        // 2. Insert Quote Request
        const requestDate = new Date().toISOString().split('T')[0];
        const quoteResult: any = await query(
            `INSERT INTO quote_requests 
            (customer_id, package_id, request_date, length_ft, width_ft, base_area_sqft, floors, total_area_sqft, estimated_total_cost, source) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                customerId,
                packageId || null,
                requestDate,
                length || null,
                width || null,
                baseArea || null,
                floors || null,
                totalArea || null,
                estimatedCost || null,
                source
            ]
        );

        // 3. Trigger Zapier Webhook
        const ZAPIER_URL = process.env.ZAPIER_WEBHOOK_URL;
        if (ZAPIER_URL) {
            try {
                // Formatting payload for Zapier
                const payload = {
                    ...body,
                    timestamp: new Date().toISOString(),
                    quoteId: quoteResult.insertId,
                    formattedDate: new Date().toLocaleString('en-IN')
                };

                await fetch(ZAPIER_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (zapError) {
                console.error('Zapier Webhook Error:', zapError);
                // We don't fail the whole request if Zapier fails, just log it
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Submission successful',
            id: quoteResult.insertId
        });

    } catch (error: any) {
        console.error('Form submission error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

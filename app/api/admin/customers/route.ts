import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        // Simple auth check (consistent with your existing login cookie)
        const cookieStore = await cookies();
        const isAdmin = cookieStore.get('admin_session');
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch customers with their most recent quote request source
        const customers: any = await query(`
            SELECT 
                c.*, 
                (SELECT qr.source FROM quote_requests qr WHERE qr.customer_id = c.id ORDER BY qr.created_at DESC LIMIT 1) as latest_source,
                (SELECT COUNT(*) FROM quote_requests qr WHERE qr.customer_id = c.id) as request_count
            FROM customers c
            ORDER BY c.created_at DESC
        `);

        return NextResponse.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

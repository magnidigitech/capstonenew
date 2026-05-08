import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Simple hardcoded credentials for now as requested
        // "I need admin and ned a login for that"
        // In a real app, use environment variables or a DB
        const ADMIN_USER = process.env.ADMIN_USER || "admin";
        const ADMIN_PASS = process.env.ADMIN_PASS || "capstone@123";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Set a cookie for the session
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}

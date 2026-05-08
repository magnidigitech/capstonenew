import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

// Helper to read data
function getContentData() {
    if (!fs.existsSync(contentFilePath)) {
        return { testimonials: [], faqs: [] };
    }
    const fileContent = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(fileContent);
}

// GET handler
export async function GET() {
    try {
        const data = getContentData();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

// POST handler (for updating content)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate basic structure
        if (!body.testimonials || !body.faqs) {
            return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
        }

        // Write to file
        fs.writeFileSync(contentFilePath, JSON.stringify(body, null, 2));

        return NextResponse.json({ success: true, message: 'Content updated successfully' });
    } catch {
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

// API-rute for Challenge Arena
import { NextResponse } from 'next/server';
import { db } from '../../../db/client';
import { challenges } from '../../../db/schema';

export async function GET() {
  try {
    const result = await db.select().from(challenges);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error getting challenges:', error);
    return NextResponse.json({ error: 'Failed to get challenges' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;
    
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    
    const inserted = await db.insert(challenges).values({ content }).returning();
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error('Error creating challenge:', error);
    return NextResponse.json({ error: 'Failed to create challenge' }, { status: 500 });
  }
}

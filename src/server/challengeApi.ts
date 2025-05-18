// API-endepunkt for Challenge Arena (serverkomponent)
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../db/client';
import { challenges } from '../db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Hent alle challenges
    const result = await db.select().from(challenges);
    res.status(200).json(result);
  } else if (req.method === 'POST') {
    // Opprett ny challenge
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const inserted = await db.insert(challenges).values({ content }).returning();
    res.status(201).json(inserted[0]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

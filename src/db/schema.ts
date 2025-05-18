// Drizzle ORM: Database-skjema for Light Cones
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Flere tabeller kan legges til her etter behov

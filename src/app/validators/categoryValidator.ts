import { z } from 'zod';

export class CategoryValidator {
  static createSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional(),
    image: z.string().url().optional(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
  });

  static updateSchema = this.createSchema.partial();
}
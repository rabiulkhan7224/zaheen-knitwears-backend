import { z } from 'zod';

export class ProductValidator {
  static createProductSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().optional(),
    price: z.number().positive(),
    sizes: z.array(z.string().min(1)).min(1),
    colors: z.array(z.string().min(1)).min(1),
    category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
    images: z.array(z.string().url()).optional(),
    stock: z.number().int().min(0),
    featured: z.boolean().optional(),
  });

  static updateProductSchema = this.createProductSchema.partial();
}
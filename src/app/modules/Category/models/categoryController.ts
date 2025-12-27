import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './categoryService';

export class CategoryController {
  private service = new CategoryService();

  getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const categories = await this.service.getAll();
    res.json({ success: true, count: categories.length, data: categories });
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await this.service.create(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  // Add update, delete similarly if needed (admin only)
}
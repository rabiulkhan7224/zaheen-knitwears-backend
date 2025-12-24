import { Request, Response, NextFunction } from 'express';
import { ProductService } from './productService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // GET /api/products
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/:id
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/products (Admin only)
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/products/:id (Admin only)
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/products/:id (Admin only)
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/search (optional public search)
  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productService.searchProducts(req.query);
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
}
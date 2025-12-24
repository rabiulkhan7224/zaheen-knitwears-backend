import { ProductValidator } from "../../validators/productValidator";
import { IProduct, Product } from "./product.model";


export class ProductService {
  async createProduct(data: any): Promise<IProduct> {
    const validatedData = ProductValidator.createProductSchema.parse(data);
    const product = new Product(validatedData);
    return await product.save();
  }

  async getAllProducts(filters: any = {}): Promise<IProduct[]> {
    return await Product.find(filters)
      .populate('category', 'name')
      .sort({ createdAt: -1 });
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await Product.findById(id).populate('category', 'name');
  }

  async updateProduct(id: string, data: any): Promise<IProduct | null> {
    const validatedData = ProductValidator.updateProductSchema.parse(data);
    return await Product.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }

  // Optional: search with filters (size, color, price range, category)
  async searchProducts(query: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    color?: string;
    featured?: boolean;
    search?: string;
  }): Promise<IProduct[]> {
    const filter: any = {};

    if (query.category) filter.category = query.category;
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = query.minPrice;
      if (query.maxPrice) filter.price.$lte = query.maxPrice;
    }
    if (query.size) filter.sizes = query.size;
    if (query.color) filter.colors = query.color;
    if (query.featured !== undefined) filter.featured = query.featured;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }
    return await Product.find(filter).populate('category', 'name');
  }
}
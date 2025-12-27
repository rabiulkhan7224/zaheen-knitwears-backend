import { Category, ICategory } from "./categoryModel";

export class CategoryService {
  async create(data: any): Promise<ICategory> {
    return (await Category.create(data)) as unknown as ICategory;
  }

  async getAll(): Promise<ICategory[]> {
    return await Category.find().sort({ name: 1 });
  }

  async getById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async update(id: string, data: any): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}
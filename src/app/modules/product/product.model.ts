import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  size: string[]; // e.g., ['S', 'M', 'L']
  color: string[];
  images: string[];
  category: Schema.Types.ObjectId; // Reference to Category
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    size: { type: [String], required: true },
    images: { type: [String], required: true },
    color: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },

    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);

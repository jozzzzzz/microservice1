import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product {
  productId: string,
  name: string,
  description: string,
  price: number,
}

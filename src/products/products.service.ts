import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { ProductSchema } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
    console.log("insertProduct" + title + desc + price);
    const newProduct = new this.productModel({
      title: title,
      description: desc, 
      price: price
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({ id: prod.id, title: prod.title, description: prod.description, price: prod.price }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    await this.productModel.findByIdAndUpdate(productId, {title: title, description: desc, price: price}).exec();
    const updatedProduct = await this.findProduct(productId);
    return updatedProduct;
  }

  deleteProduct(prodId: string) {
    this.productModel.findByIdAndDelete(prodId).exec();
  }

  private async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return { id: product.id, title: product.title, description: product.description, price: product.price};
  }
}

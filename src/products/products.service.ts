import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(name: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      productId: uuidv4(),
      name: name,
      description: desc, 
      price: price
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({ id: prod.productId, name: prod.name, description: prod.description, price: prod.price }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(productId: string, name: string, desc: string, price: number) {
    await this.productModel.findOneAndUpdate({productId: productId}, {name: name, description: desc, price: price}).exec();
    const updatedProduct = await this.findProduct(productId);
    return updatedProduct;
  }

  deleteProduct(prodId: string) {
    this.productModel.findOneAndDelete({productId: prodId}).exec();
  }

  private async findProduct(id: string): Promise<Product> {
    console.log("findProduct" + id);
    const product = await this.productModel.findOne({productId: id}).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return { productId: product.productId, name: product.name, description: product.description, price: product.price};
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(product: CreateProductDto) {
    const newProduct = new this.productModel({
      productId: uuidv4(),
      name: product.name,
      description: product.description, 
      price: product.price
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

  async updateProduct(product: UpdateProductDto) {
    await this.productModel.findOneAndUpdate({productId: product.productId}, {name: product.name, description: product.description, price: product.price}).exec();
    const updatedProduct = await this.findProduct(product.productId);
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

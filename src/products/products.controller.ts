import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(@Body() CreateProductDto: CreateProductDto) {
    const generatedId = await this.productsService.insertProduct(CreateProductDto);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product = this.productsService.getSingleProduct(prodId);
    return product;
  }

  @Patch(':id')
  async updateProduct(@Body() UpdateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsService.updateProduct(UpdateProductDto);
    return updateProduct;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
      this.productsService.deleteProduct(prodId);
      return null;
  }
}

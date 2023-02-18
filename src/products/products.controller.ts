import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Product')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Product> {
    return await this.productsService.getOneProduct(id);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: number): Promise<any> {
    return await this.productsService.removeProduct(id);
  }
}

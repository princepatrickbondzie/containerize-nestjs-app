import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repo.save(createProductDto);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.repo.find();
  }

  async getOneProduct(id: number): Promise<Product> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async removeProduct(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}

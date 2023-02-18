import { Injectable } from '@nestjs/common';
import { Order } from '../orders/entities/order.entity';
import { User } from '../auth/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getStats(): Promise<any> {
    const orders = await this.orderRepo.find();
    const products = await this.productRepo.find();
    const users = await this.userRepo.find();
    
    const response = {
      message: 'Complete Analysis Loaded',
      data: {
        sold: orders.length,
        products: products.length,
        users: users.length,
      },
    };

    return response;
  }
}

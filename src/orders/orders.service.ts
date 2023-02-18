import { Order } from './entities/order.entity';
import { User } from '../auth/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customer, product } = createOrderDto;

    const user = await this.userRepo.findOne({ where: { name: customer } });
    if (!user) throw new Error('user not found');

    const prod = await this.productRepo.findOne({
      where: { name: product },
    });
    if (!prod) throw new Error('product not found');

    const order = this.repo.save(createOrderDto);

    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.repo.find();
  }

  async getOneOrder(id: number): Promise<Order> {
    return await this.repo.findOne({ where: { id } });
  }

  async removeOrder(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Order')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrder(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getOneOrder(@Param('id') id: number): Promise<Order> {
    return await this.ordersService.getOneOrder(id);
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: number): Promise<any> {
    return await this.ordersService.removeOrder(id);
  }
}

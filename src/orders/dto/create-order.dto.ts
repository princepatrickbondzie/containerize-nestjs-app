import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly customer!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly product!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price!: number;
}

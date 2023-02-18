import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthCredentialDTO {
  @IsNotEmpty()
  @ApiProperty()
  readonly name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;
}

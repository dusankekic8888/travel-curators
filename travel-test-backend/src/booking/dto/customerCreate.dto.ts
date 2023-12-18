import { IsNotEmpty, IsString } from 'class-validator';
import { CustomerEntity } from '../entity/customer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerCreateDto implements  Omit<CustomerEntity, 'id'>{
  @ApiProperty({
    example: 'Customer Name',
    description: 'Name of customer',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '0986986986',
    description: 'Phone of customer',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'customer@email.com',
    description: 'Email of customer',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Ha Noi',
    description: 'Address of customer',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}

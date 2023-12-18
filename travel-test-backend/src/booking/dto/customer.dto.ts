import {  IsNotEmpty, IsNumber } from 'class-validator';
import { CustomerEntity } from '../entity/customer.entity';

export class CustomerDto implements CustomerEntity{
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

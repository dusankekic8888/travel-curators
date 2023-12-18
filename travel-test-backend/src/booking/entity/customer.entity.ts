
import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  
}

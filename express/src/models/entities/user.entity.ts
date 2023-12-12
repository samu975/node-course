import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

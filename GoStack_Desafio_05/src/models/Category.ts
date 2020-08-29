import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Transaction from './Transaction';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('time with time zone')
  created_at: Date;

  @Column('time with time zone')
  updated_at: Date;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction;
}

export default Category;

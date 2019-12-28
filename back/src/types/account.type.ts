import { Stock } from './stock.type';
import { BasicRelationalType } from '../framework/basic-relational-type.frw';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsNumber, IsNotEmpty } from 'class-validator';

@Entity()
export class Account extends BasicRelationalType {

  @IsNumber()
  @IsNotEmpty()
  @Column({ nullable: false, default: 0 })
  balance: number;

  @ManyToMany(type => Stock)
  @JoinTable()
  stocks: Stock[];
}
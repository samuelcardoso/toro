import { Stock } from './stock.type';
import { BasicRelationalType } from '../framework/basic-relational-type.frw';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class Account extends BasicRelationalType {

  @IsNumber()
  @IsNotEmpty()
  @Column({ nullable: false, default: 0 })
  balance: number;

  @IsOptional()
  @ManyToMany(() => Stock, stock => stock.accounts, {
    nullable: true,
    eager: true,
    cascade: ["insert", "update"]
  })
  @JoinTable({name: "account_stock"})
  stocks?: Stock[];
}
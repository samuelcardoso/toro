import { BasicRelationalType } from '../framework/basic-relational-type.frw';
import { Entity, Column, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Account } from './account.type';

@Entity()
export class Stock extends BasicRelationalType {

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  name: String;

  @ManyToMany(() => Account, account => account.stocks)
  accounts?: Account[];
}
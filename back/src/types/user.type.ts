import { BasicRelationalType } from '../framework/basic-relational-type.frw';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Account } from './account.type';

@Entity()
export class User extends BasicRelationalType {

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false })
  name: String;

  @IsNotEmpty()
  @JoinColumn()
  @OneToOne(type => Account, { cascade: true, nullable: false })
  account: Account;
}
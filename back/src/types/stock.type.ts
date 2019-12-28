import { BasicRelationalType } from '../framework/basic-relational-type.frw';
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Stock extends BasicRelationalType {

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false, default: 0 })
  name: String;
}
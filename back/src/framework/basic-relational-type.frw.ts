import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, Column } from 'typeorm';
import { IsOptional } from 'class-validator';

export class BasicRelationalType {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  id: string;

  @CreateDateColumn()
  @IsOptional()
  createDate: Date;

  @UpdateDateColumn({nullable: true})
  @IsOptional()
  updateDate?: Date;

  @VersionColumn()
  @IsOptional()
  version: number;

  @Column({ default: false })
  @IsOptional()
  deleted: boolean;

  @Column({ default: true })
  @IsOptional()
  insync: boolean;
}
import { transformAndValidate } from 'class-transformer-validator';
import { Account } from '../types/account.type';
import Constants from '../framework/contants.frw';
import { Connection } from 'typeorm';

export default class AccountService {
  public static async findByFilter(conn: Connection, filter: string) {
    return conn.getRepository('Account').find();
  }

  public static async create(conn: Connection, account: Account): Promise<string> {
    await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
    const savedEntity = await conn.getRepository('Account').save(account);
    return savedEntity.id;
  }

//   public async get(id: any): Promise<Account | undefined> {
//   }

//   public async update(country: Account, id: any): Promise<void> {
//   }

//   public async remove(id: any): Promise<void> {
//   }
}

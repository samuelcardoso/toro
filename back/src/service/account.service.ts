import { transformAndValidate } from 'class-transformer-validator';
import { Account } from '../types/account.type';
import Constants from '../framework/contants.frw';
import { Connection } from 'typeorm';

export default class AccountService {
  public static async get(conn: Connection, id: string): Promise<Account | unknown> {
    return conn.getRepository('Account').findOne(id);
  }

  public static async updateBalance(conn: Connection, id: string, amount: number): Promise<void> {
    const account = <Account | undefined> await conn.getRepository('Account').findOne(id);
    if(!account) {
      return;
    }
    account.balance += amount;
    await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
    await conn.getRepository('Account').update(id, account);
  }

  public static async buyStock(redisClient, conn: Connection, id: string, stockName: string): Promise<void> {
    const account = <Account | undefined> await conn.getRepository('Account').findOne(id);
    if(!account) {
      return;
    }
    console.log(stockName);
    return new Promise((resolve, reject) => {
      redisClient.get(stockName, (err, reply) => {
        if(err) {
          console.error(`Error: ${JSON.stringify(err)}`);
          return reject(err);
        }
        console.log(`Ok: ${JSON.stringify(reply)}`);
        resolve();
      });
      // await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
      // console.debug(account);
    });
  }

  public static async sellStock(redisClient, conn: Connection, id: string, stockName: string): Promise<void> {
    const account = <Account | undefined> await conn.getRepository('Account').findOne(id);
    if(!account) {
      return;
    }
    console.log(stockName);
    return new Promise((resolve, reject) => {
      redisClient.get(stockName, (err, reply) => {
        if(err) {
          console.error(`Error: ${JSON.stringify(err)}`);
          return reject(err);
        }
        console.log(`Ok: ${JSON.stringify(reply)}`);
        resolve();
      });
      // await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
      // console.debug(account);
    });
  }
}

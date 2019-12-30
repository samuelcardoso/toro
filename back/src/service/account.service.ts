import { transformAndValidate } from 'class-transformer-validator';
import { Account } from '../types/account.type';
import Constants from '../framework/contants.frw';
import { Connection } from 'typeorm';
import BusinessException from '../framework/business.exception';

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
    const account = <Account | undefined> await conn.getRepository('Account').findOne(id, { loadEagerRelations: true });
    if(!account) {
      throw new BusinessException(BusinessException.ACCOUNT.AAA);
    }

    return new Promise((resolve, reject) => {
      redisClient.get(stockName, async (err, reply) => {
        if(err) {
          console.error(`Error: ${JSON.stringify(err)}`);
          return reject(err);
        }

        if(!account.stocks) {
          account.stocks = [];
        }

        if(!reply) {
          throw new BusinessException(BusinessException.ACCOUNT.BBB);
        }

        if(account.stocks.filter((obj) => obj.name === stockName).length === 0) {
          account.stocks.push(<any>{
            name: stockName
          });

          try {
            const stockValue = JSON.parse(reply)[stockName];
            account.balance -= stockValue;
            await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
            await conn.getRepository('Account').save(account);
            return resolve();
          } catch(err) {
            console.error(err);
            return reject(err);
          }
        } else {
          return reject(new BusinessException(BusinessException.ACCOUNT.AAA))
        }
      });
    });
  }

  public static async sellStock(redisClient, conn: Connection, id: string, stockName: string): Promise<void> {
    const account = <Account | undefined> await conn.getRepository('Account').findOne(id, { loadEagerRelations: true });
    
    if(!account) {
      throw new BusinessException(BusinessException.ACCOUNT.AAA);
    }

    if(!account.stocks) {
      throw new BusinessException(BusinessException.ACCOUNT.BBB);
    }

    return new Promise((resolve, reject) => {
      redisClient.get(stockName, async (err, reply) => {
        if(err) {
          console.error(`Error: ${JSON.stringify(err)}`);
          return reject(err);
        }

        if(!reply) {
          throw new BusinessException(BusinessException.ACCOUNT.BBB);
        }

        if(account.stocks) {
          console.debug(account);
          account.stocks = account.stocks.filter((obj) => obj.name !== stockName);
          console.debug(account);
          try {
            const stockValue = JSON.parse(reply)[stockName];
            account.balance += stockValue;
            await transformAndValidate(Account, account, Constants.VALIDATOR_OPTIONS);
            await conn.getRepository('Account').save(account);
            return resolve();
          } catch(err) {
            console.error(err);
            return reject(err);
          }
        }
      });
    });
  }
}

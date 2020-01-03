import { Stock } from '../types/stock.type';

export default class StockService {
  public static async all(redisClient): Promise<Array<Stock> | unknown> {
    return new Promise((resolve, reject) => {
      redisClient.keys('*', async (err, reply) => {
        if(err) {
          console.error(`Error: ${JSON.stringify(err)}`);
          return reject(err);
        }
        return resolve(reply);
      });
    });
  }
}

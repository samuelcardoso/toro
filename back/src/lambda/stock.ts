import AccessUtils from '../framework/access.frw';
import StockService from '../service/stock.service';

const redis = require("redis"), redisClient = redis.createClient({host: 'redis'});
redisClient.on("error", (err) => {
    console.error(err);
});

export async function all(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      return {
        statusCode: 200,
        body: JSON.stringify(
          await StockService.all(redisClient)
        )
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

import { Database } from '../framework/database.frw';
import { getConnectionManager } from 'typeorm';
import AccountService from '../service/account.service';
import AccessUtils from '../framework/access.frw';

const connectionManager = getConnectionManager();

const redis = require("redis"), redisClient = redis.createClient({host: 'redis'});
redisClient.on("error", (err) => {
    console.error(err);
});

export async function all(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(await AccountService.all(p[0]))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

export async function get(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(
          await AccountService.get(p[0],
          event.pathParameters.id)
        )
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

export async function updateBalance(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(
          await AccountService.updateBalance(p[0],
          event.pathParameters.id,
          JSON.parse(event.body).amount))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

export async function buyStock(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(
          await AccountService.buyStock(
          redisClient,
          p[0],
          event.pathParameters.id,
          JSON.parse(event.body).stock))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

export async function sellStock(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(
          await AccountService.sellStock(
          redisClient,
          p[0],
          event.pathParameters.id,
          JSON.parse(event.body).stock))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}


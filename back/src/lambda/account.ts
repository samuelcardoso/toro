import { Database } from '../framework/database.frw';
import { getConnectionManager } from 'typeorm';
import AccountService from '../service/account.service';

const connectionManager = getConnectionManager();

export async function create(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(await AccountService.create(p[0], JSON.parse(event.body)))
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
}

export async function findByFilter(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(await AccountService.findByFilter(p[0], event.queryStringParameters))
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
}



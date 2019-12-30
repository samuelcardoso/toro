import { Database } from '../framework/database.frw';
import { getConnectionManager } from 'typeorm';
import UserService from '../service/user.service';
import AccessUtils from '../framework/access.frw';

const connectionManager = getConnectionManager();

export async function all(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 200,
        body: JSON.stringify(await UserService.all(p[0]))
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
        body: JSON.stringify(await UserService.get(p[0], event.pathParameters.id))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

export async function create(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
    try {
      const p = await Promise.all([
        Database.getConnection(connectionManager)
      ]);
      return {
        statusCode: 201,
        body: JSON.stringify(await UserService.create(p[0], JSON.parse(event.body)))
      };
    } catch (err) {
      return AccessUtils.getResponse(err);
    }
}

import { Stock } from './../types/stock.type';
import { User } from '../types/user.type';
import { Account } from '../types/account.type';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class Database {
  public static async getConnection(connectionManager): Promise<Connection> {
    const CONNECTION_NAME = 'default';

    let connection: Connection;

    if (connectionManager.has(CONNECTION_NAME)) {
      console.debug('Database.getConnection() - using existing connection ...');
      connection = await connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      console.info('Database.getConnection() - creating connection ... ');
      const connectionOptions: ConnectionOptions = {
        name: CONNECTION_NAME,
        type: 'mysql',
        synchronize: true,
        database: 'torodb',
        logging: true,
        url: process.env.DATABASE_CONNECTION,
        dropSchema: <boolean | undefined> process.env.DROP_SCHEMA,
        entities: [
          Account,
          User,
          Stock
        ]
      };

      connection = await createConnection(connectionOptions);
    }

    return connection;
  }
}

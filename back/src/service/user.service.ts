import { transformAndValidate } from 'class-transformer-validator';
import { Connection } from 'typeorm';
import { User } from '../types/user.type';
import Constants from '../framework/contants.frw';

export default class UserService {
  public static async all(conn: Connection): Promise<Array<User> | unknown> {
    return conn.getRepository('User').find();
  }

  public static async get(conn: Connection, id: string): Promise<User | unknown> {
    return conn.getRepository('User').findOne(id);
  }

  public static async create(conn: Connection, user: User): Promise<User | unknown> {
    await transformAndValidate(User, user, Constants.VALIDATOR_OPTIONS);
    console.debug(user);
    const { id } = await conn.getRepository('User').save(user);
    return id;
  }
}

import { transformAndValidate } from 'class-transformer-validator';
import { Connection } from 'typeorm';
import { User } from '../types/user.type';
import Constants from '../framework/contants.frw';
import BusinessException from '../framework/business.exception';

export default class UserService {
  public static async all(conn: Connection): Promise<Array<User> | unknown> {
    const users = await conn.getRepository('User').find({ relations: ['account'] });
    if(!users) {
      throw new BusinessException(BusinessException.USER.NOT_FOUND);
    }
    return users;
  }

  public static async get(conn: Connection, id: string): Promise<User | unknown> {
    const user = await conn.getRepository('User').findOne(id, { relations: ['account'] });
    if(!user) {
      throw new BusinessException(BusinessException.USER.NOT_FOUND);
    }
    return user;
  }

  public static async create(conn: Connection, user: User): Promise<User | unknown> {
    await transformAndValidate(User, user, Constants.VALIDATOR_OPTIONS);
    console.debug(user);
    const { id } = await conn.getRepository('User').save(user);
    return id;
  }
}

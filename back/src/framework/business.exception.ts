import { ValidationError } from 'class-validator';
export default class BusinessException extends Error {
  __proto__: Error;

  children: any;

  constructor(message?: string, children?: any, isPermission? : boolean) {
    const trueProto = new.target.prototype;
    super(message);
    // eslint-disable-next-line no-proto
    this.__proto__ = trueProto;
    this.children = children;
  }

  public static USER = {
    USER_NOT_FOUND: 'USER_NOT_FOUND'
  };

  public static ACCOUNT = {
    AAA: 'AAA',
    BBB: 'BBB',
    CCC: 'CCC',
    DDD: 'DDD'
  };

  public toJson() {
    return [<ValidationError>{
      constraints: {
        code: this.message
      },
      property: '',
      children: this.children ? this.children : []
    }];
  }
}

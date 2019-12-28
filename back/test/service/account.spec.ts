import 'mocha';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('auth', () => {
  it('should return 401 for an unauthorized user', async () => {
    // const { err, res } = await chai.request(config.SERVER_URL)
    //   .post(`app/${path}`)
    //   .send({
    //     username: 'dummy',
    //     password: entities[0].password
    //   });
    // if (err) {
    //   return Promise.reject(err);
    // }
    // expect(res).to.have.status(401);
    // return Promise.resolve();
  });
  it('should return 401 for an invalid password', async () => {
    // const { err, res } = await chai.request(config.SERVER_URL)
    //   .post(`app/${path}`)
    //   .send({
    //     username: entities[1].username,
    //     password: 'dummy'
    //   });
    // if (err) {
    //   return Promise.reject(err);
    // }
    // expect(res).to.have.status(401);
    // return Promise.resolve();
  });
  it('should return 200 for an authorized user', async () => {
    // const { err, res } = await chai.request(config.SERVER_URL)
    //   .post(`app/${path}`)
    //   .send(entities[0]);
    // if (err) {
    //   return Promise.reject(err);
    // }
    // expect(res).to.have.status(200);
    // return Promise.resolve();
  });
});

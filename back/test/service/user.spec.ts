import 'mocha';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const URL = 'http://localhost:8082/';

chai.use(chaiHttp);

describe('User', () => {
  it('should return 200 for listing all', async () => {
    const { err, res } = await chai.request(URL)
      .get(`users/all`);
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
    const resp = res.body ? res.body : JSON.parse(res.text);
    expect(resp).to.be.a('array');
  });
  it('should return 201 for creating users', async () => {
    const { err, res } = await chai.request(URL)
      .post(`users/`)
      .send({
        name: "Samuel",
        account: {
          balance: 0 
        }
      });
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(201);
  });
  it('should return 200 for listing all and it should be an array of at least one item', async () => {
    const { err, res } = await chai.request(URL)
      .get(`users/all`);
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
    const resp = res.body ? res.body : JSON.parse(res.text);
    expect(resp).to.have.lengthOf.above(0);
  });
});

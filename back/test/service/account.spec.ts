import 'mocha';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const URL = 'http://localhost:8082/';

chai.use(chaiHttp);

describe('Account', () => {
  it('should return 200 for listing all', async () => {
    const { err, res } = await chai.request(URL)
      .get(`accounts/all`);
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
    const resp = res.body ? res.body : JSON.parse(res.text);
    expect(resp).to.be.a('array');
  });
  it('should return 403 for return an inexistent account', async () => {
    const { err, res } = await chai.request(URL)
      .get(`accounts/123`);
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(403);
  });
  it('should return 200 for return an existent account', async () => {
    const ans = await chai.request(URL)
      .get(`accounts/all`);
    if (ans.err) {
      return Promise.reject(ans.err);
    }
    const resp = ans.res.body ? ans.res.body : JSON.parse(ans.res.text);
    const { err, res } = await chai.request(URL)
      .get(`accounts/${resp[0].id}`);
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
  });
  it('should return 200 for return an balance update', async () => {
    const ans = await chai.request(URL)
      .get(`accounts/all`);
    if (ans.err) {
      return Promise.reject(ans.err);
    }
    const resp = ans.res.body ? ans.res.body : JSON.parse(ans.res.text);
    const { err, res } = await chai.request(URL)
      .put(`accounts/${resp[0].id}`)
      .send({
        amount: 100
      });
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
  });
  it('should return 200 for return a existent stock operation (buy)', async () => {
    const ans = await chai.request(URL)
      .get(`accounts/all`);
    if (ans.err) {
      return Promise.reject(ans.err);
    }
    const resp = ans.res.body ? ans.res.body : JSON.parse(ans.res.text);
    const { err, res } = await chai.request(URL)
      .put(`accounts/${resp[0].id}/buystock`)
      .send({
        stock: "ITUB4"
      });
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
  });
  it('should return 200 for return a existent stock operation (sell)', async () => {
    const ans = await chai.request(URL)
      .get(`accounts/all`);
    if (ans.err) {
      return Promise.reject(ans.err);
    }
    const resp = ans.res.body ? ans.res.body : JSON.parse(ans.res.text);
    const { err, res } = await chai.request(URL)
      .put(`accounts/${resp[0].id}/sellstock`)
      .send({
        stock: "ITUB4"
      });
    if (err) {
      return Promise.reject(err);
    }
    expect(res).to.have.status(200);
  });
});

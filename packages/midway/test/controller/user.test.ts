import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

expect.extend({
  toBeJWT(response) {
    console.log(response)
    return {
      message: () =>
        `xxx`,
      pass: true,
    };
  },
});

describe('test/controller/user.test.ts', () => {

  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result_pass = await createHttpRequest(app).post('/api/user/login').send({
      "username":"Me and Bears",
      "password":"I am near polar bears"
    });

    // use expect by jest
    expect(result_pass.status).toBe(200);
    expect((JSON.parse(result_pass.text))?.data?.token).toBeTruthy();

    const result_reject = await createHttpRequest(app).post('/api/user/login').send({
      "username":"1",
      "password":"2"
    });

    // use expect by jest
    expect(result_reject.status).toBe(200);
    expect((JSON.parse(result_reject.text))?.data?.token).toBeFalsy();

    // todo: test long response & improve format check

    // close app
    await close(app);
  });

});

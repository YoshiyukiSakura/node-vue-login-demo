import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();

    const delay1000 = new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, { status: 504, text: 'timeout' });
    });

    // make request
    // @ts-ignore
    const { status, text } = await Promise.race([
      createHttpRequest(app).post('/api/user/login').send({
        username: 'jack',
        password: '2c2abf7c9d737a2d253c7cc3caf5376f',
      }),
      delay1000,
    ]);

    // use expect by jest
    expect(status).toBe(200);
    expect(JSON.parse(text)).toEqual(
      expect.objectContaining({
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: expect.any(String),
        },
      })
    );

    const result_reject = await createHttpRequest(app)
      .post('/api/user/login')
      .send({
        username: '1',
        password: '2',
      });

    // use expect by jest
    expect(result_reject.status).toBe(200);
    expect(JSON.parse(result_reject.text)).toEqual(
      expect.objectContaining({
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      })
    );

    // close app
    await close(app);
  });
});

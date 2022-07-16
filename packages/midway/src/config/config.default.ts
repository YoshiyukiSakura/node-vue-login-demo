import { MidwayConfig } from '@midwayjs/core';
import * as path from "path";

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1657868222198_9982',
  koa: {
    port: 7001,
  },
  //todo: for dev only, use proper DB for prod
  orm: {
    type: 'sqlite',
    database: path.join('/Users/yoshiyuki/WebstormProjects/node-vue-login-demo/packages/midway/database.sqlite'),
    synchronize: true,
    logging: true,
  },
  //todo: for dev only,use a .env file for prod
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d'
  },
} as MidwayConfig;

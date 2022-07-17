import '@midwayjs/jwt';

import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
// import {UserModel} from "../model/user.model";
import { UserModel } from '../model/user.model';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';

// import { JwtPassportMiddleware } from './middleware/jwt.middleware';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  jwt: JwtService;

  @Inject()
  userModel: UserModel;

  @Get('/init')
  async init(): Promise<object> {
    const user = await this.userModel.saveUserEntity();
    return { user };
  }

  @Post('/login')
  @Validate()
  async login(@Body() body: UserLoginDTO): Promise<object> {
    const { username, password } = body;
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );
    if (!user) {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
    return {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token: await this.jwt.sign({ username: user.username }),
      },
    };
  }
}

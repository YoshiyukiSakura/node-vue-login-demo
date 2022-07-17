import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as MD5 from 'crypto-js/md5';

@Provide()
export class UserModel {
  @Inject()
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    return await this.userModel.findOne({ where: { username, password } });
  }

  // save
  async saveUserEntity() {
    let user = new UserEntity();
    user.username = 'jack';
    user.password = MD5('redballoon').toString();

    // save entity
    const userResult = await this.userModel.save(user);

    // save success
    console.log('user id = ', userResult.id);
    return userResult;
  }

  async getUserList() {
    return await this.userModel.find({});
  }
}

import { PrimaryGeneratedColumn, Column } from "typeorm"
import {EntityModel} from "@midwayjs/orm";

@EntityModel('user', { schema: 'ktw' })
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({length:64})
  username: string

  @Column({length:64})
  password: string

}

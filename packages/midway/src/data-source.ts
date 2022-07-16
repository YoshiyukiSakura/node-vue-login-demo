import "reflect-metadata"
import { DataSource } from "typeorm"
import {UserEntity}  from "./entity/user.entity"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "/Users/yoshiyuki/WebstormProjects/node-vue-login-demo/packages/midway/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
  ],
  migrations: [],
  subscribers: [],
})

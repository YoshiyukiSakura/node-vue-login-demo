import {Rule, RuleType} from "@midwayjs/validate";

export class UserLoginDTO {
  @Rule(RuleType.string().min(1).max(64).required())
  username: string;

  @Rule(RuleType.string().min(1).max(64).required())
  password: string;
}

import { UserTypes } from "../enums/user-type.enum";

export interface AuthConfig {
  apiBaseUrl: string;
  userType: UserTypes;
}

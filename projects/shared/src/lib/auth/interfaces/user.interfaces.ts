import { UserTypes } from "../enums/user-type.enum";

export interface User {
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  usertype: UserTypes | null;
  role: boolean;
  permission: string | null;
}

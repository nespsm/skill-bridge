import { MasterUserModalMode } from "./modal-mode.type";

export interface UserData {
  id: number;
  name: string;
  email: string;
  roleId?: number;
  roleName: string;
  password?: string;
  age?: number;
  matchPassword?: string;
}


export interface UserDialogInput {
  mode: MasterUserModalMode;
  data?: UserData;
}
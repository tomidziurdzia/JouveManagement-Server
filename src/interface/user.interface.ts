import { Model } from "sequelize";

export interface UserInterface extends Model {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  picture?: string;
  password: string;
  confirmed: boolean;
  googleAccount: boolean;
  token: string;
}

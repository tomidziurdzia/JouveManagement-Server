import { DataTypes } from "sequelize";
import { db } from "../db/connection";
import { UserInterface } from "../interface/user.interface";

const User = db.define<UserInterface>("User", {
  name: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
  },
  googleAccount: {
    type: DataTypes.BOOLEAN,
  },
  token: {
    type: DataTypes.STRING,
  },
});

export default User;

import { DataTypes, Model, Optional } from "sequelize";
import { BusinessInterface } from "../interface/business.interface";
import { db as sequelize } from "../db/connection";

interface BusinessCreationAttributes
  extends Optional<BusinessInterface, "id"> {}

class Business extends Model<BusinessInterface, BusinessCreationAttributes> {
  token: string | undefined;
}
Business.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    googleAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("owner", "employee"),
      defaultValue: "owner",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Business",
  }
);

export default Business;

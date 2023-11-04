import { DataTypes, Model, Optional } from "sequelize";
import { BusinessInterface } from "../interface/business.interface";
import { db as sequelize } from "../db/connection";

interface BusinessCreationAttributes
  extends Optional<BusinessInterface, "id_business"> {}

class Business extends Model<BusinessInterface, BusinessCreationAttributes> {
  id_business: string | undefined;
  businessName: string | undefined;
  cuit: string | undefined;
  email: string | undefined;
  token: string | undefined;
  password: string | undefined;
  confirmed: boolean | undefined;
  picture: string | undefined;
}
Business.init(
  {
    id_business: {
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
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "Business",
  }
);

export { Business };

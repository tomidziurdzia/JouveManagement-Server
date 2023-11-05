import { DataTypes, Model, Optional } from "sequelize";
import { TravelInterface } from "../interface/travel.interface";
import { db as sequelize } from "../db/connection";

interface TravelCreationAttributes
  extends Optional<TravelInterface, "id_travel"> {}

class Travel extends Model<TravelInterface, TravelCreationAttributes> {
  id_travel?: string;
  date: string | undefined;
  id_business: string | undefined;
  id_driver: string | undefined;
  id_assistant: string | undefined;
  id_vehicle: string | undefined;
  id_semirremolque: string | undefined;
  driver: {} | undefined;
  assistant: {} | undefined;
  vehicle: {} | undefined;
  semirremolque: {} | undefined;
  truck: any;
  semi: any;
  truck_driver: any;
  truck_assistant: any;
  Business: any;
}
Travel.init(
  {
    id_travel: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Travel",
  }
);

export { Travel };

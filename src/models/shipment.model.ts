import { DataTypes, Model, Optional } from "sequelize";
import { ShipmentInterface } from "../interface/shipment.interface";
import { db as sequelize } from "../db/connection";

interface ShipmentCreationAttributes
  extends Optional<ShipmentInterface, "id_shipment"> {}

class Shipment extends Model<ShipmentInterface, ShipmentCreationAttributes> {
  id_travel?: string;
  id_shipment?: string;
  id_business: string | undefined;
  Business: any;
  from: string | undefined;
  to: string | undefined;
  client: string | undefined;
  description: string | undefined;
  delivered: boolean | undefined;
  reason: string | undefined;
  picture: string | undefined;
}
Shipment.init(
  {
    id_shipment: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "Shipment",
  }
);

export { Shipment };

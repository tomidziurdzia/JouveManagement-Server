import { DataTypes, Model, Optional } from "sequelize";
import { VehicleInterface } from "../interface/vehicle.interface";
import { db as sequelize } from "../db/connection";

interface VehicleCreationAttributes
  extends Optional<VehicleInterface, "id_vehicle"> {}

class Vehicle extends Model<VehicleInterface, VehicleCreationAttributes> {
  id_vehicle?: string;
  patent: string | undefined;
  model: string | undefined;
  typeVehicle:
    | "chasis truck"
    | "balancin truck"
    | "semirremolque"
    | "tractor"
    | undefined;
  picture?: string;
  id_business: string | undefined;
}
Vehicle.init(
  {
    id_vehicle: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    typeVehicle: {
      type: DataTypes.ENUM(
        "chasis truck",
        "balancin truck",
        "semirremolque",
        "tractor",
        "-"
      ),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Vehicle",
  }
);

export { Vehicle };

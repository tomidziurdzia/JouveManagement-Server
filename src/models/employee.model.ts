import { DataTypes, Model, Optional } from "sequelize";
import { EmployeeInterface } from "../interface/employee.interface";
import { db as sequelize } from "../db/connection";

interface EmployeeCreationAttributes
  extends Optional<EmployeeInterface, "id_employee"> {}

class Employee extends Model<EmployeeInterface, EmployeeCreationAttributes> {
  id_employee?: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  cuil: string | undefined;
  picture?: string | undefined;
  password: string | undefined;
  type: "Administrative" | "Driver" | "Assistant" | "" | undefined;
  id_business: string | undefined;
}
Employee.init(
  {
    id_employee: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuil: {
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
    type: {
      type: DataTypes.ENUM("Administrative", "Driver", "Assistant"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Employee",
  }
);

export { Employee };

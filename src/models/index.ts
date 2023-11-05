import { Business } from "./business.model";
import { Employee } from "./employee.model";
import { Vehicle } from "./vehicle.model";
import { Travel } from "./travel.model";

// Business
Business.hasMany(Employee, { foreignKey: "id_business" });
Employee.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Vehicle, { foreignKey: "id_business" });
Vehicle.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Travel, { foreignKey: "id_business" });
Travel.belongsTo(Business, { foreignKey: "id_business" });

// Travel.belongsToMany(Employee, {
//   foreignKey: "id_employee",
//   through: "Driver_Travel",
// });
// Employee.belongsToMany(Travel, {
//   foreignKey: "id_employee",
//   through: "Driver_Travel",
// });

// Modelo Employee
// Employee.belongsToMany(Travel, {
//   through: "EmployeeTravel", // Nombre de la tabla intermedia
//   foreignKey: "id_employee", // Clave foránea en la tabla intermedia
// });

// // Modelo Travel
// Travel.belongsToMany(Employee, {
//   through: "EmployeeTravel", // Nombre de la tabla intermedia
//   foreignKey: "id_travel", // Clave foránea en la tabla intermedia
// });

Travel.belongsTo(Vehicle, {
  foreignKey: "id_vehicle",
  as: "truck",
});

Travel.belongsTo(Vehicle, {
  foreignKey: "id_semirremolque",
  as: "semi",
});

Travel.belongsTo(Employee, {
  foreignKey: "id_driver",
  as: "truck_driver",
});

Travel.belongsTo(Employee, {
  foreignKey: "id_assistant",
  as: "truck_assistant",
});

export { Business, Employee, Vehicle, Travel };

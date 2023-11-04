import { Business } from "./business.model";
import { Employee } from "./employee.model";
import { Vehicle } from "./vehicle.model";

// Business
Business.hasMany(Employee, { foreignKey: "id_business" });
Employee.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Vehicle, { foreignKey: "id_business" });
Vehicle.belongsTo(Business, { foreignKey: "id_business" });

export { Business, Employee, Vehicle };

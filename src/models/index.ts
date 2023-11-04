import { Business } from "./business.model";
import { Employee } from "./employee.model";

// Business
Business.hasMany(Employee, { foreignKey: "id_business" });
Employee.belongsTo(Business, { foreignKey: "id_business" });
export { Business, Employee };

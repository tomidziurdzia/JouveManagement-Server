import { Business } from "./business.model";
import { Employee } from "./employee.model";
import { Vehicle } from "./vehicle.model";
import { Travel } from "./travel.model";
import { Shipment } from "./shipment.model";

// Business
Business.hasMany(Employee, { foreignKey: "id_business" });
Employee.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Vehicle, { foreignKey: "id_business" });
Vehicle.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Travel, { foreignKey: "id_business" });
Travel.belongsTo(Business, { foreignKey: "id_business" });

Business.hasMany(Shipment, { foreignKey: "id_business" });
Shipment.belongsTo(Business, { foreignKey: "id_business" });

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

Shipment.hasOne(Travel, { foreignKey: "id_travel" });
Travel.hasMany(Shipment, { foreignKey: "id_travel" });

export { Business, Employee, Vehicle, Travel, Shipment };

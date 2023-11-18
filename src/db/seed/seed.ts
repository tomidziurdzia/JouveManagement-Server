import { Employee, Travel, Vehicle } from "../../models";
import connectDB, { db } from "../connection";
import { seedData } from "./data";

(async () => {
  await connectDB();

  await main();
  await db.close();
})();

async function main() {
  //   const employees = await Employee.bulkCreate(seedData.employees as any);
  //   const vehicles = await Vehicle.bulkCreate(seedData.vehicles as any);
  const travels = await Travel.bulkCreate(seedData.travels as any);
}

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize({
  database: process.env.MYSQLDATABASE,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT!, 10),
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database online");
  } catch (error) {
    console.log(`Error llego aca: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

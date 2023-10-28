import { Sequelize } from "sequelize";

const db = new Sequelize("jouve_schema", "root", "Walter960", {
  host: "localhost",
  dialect: "mysql",
  // logging: false,
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Database online");
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

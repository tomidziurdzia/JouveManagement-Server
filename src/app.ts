import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import connectDB from "./db/connection";

const app: Application = express();
app.use(express.json());

dotenv.config();

connectDB();

// Configurar CORS
// Probando Git de Back

const whitelist = [process.env.FRONTEND_URL];
console.log(whitelist);

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      // El origen del request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors());
// Routing
app.use("/api", routes);

const port = process.env.MYSQLPORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

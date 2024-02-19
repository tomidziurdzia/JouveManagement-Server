import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import connectDB from "./db/connection";

const app: Application = express();
dotenv.config();

// Call Database
connectDB();

// Configurate CORS
const whitelist = [process.env.FRONTEND_URL];

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

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// Routing
app.use("/api", routes);

const port = process.env.MYSQLPORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

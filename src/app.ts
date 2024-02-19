import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import connectDB from "./db/connection";

const app: Application = express();
app.use(express.json());

dotenv.config();
app.use(express.json());

connectDB();

// Configurar CORS
// Probando Git de Back

const whitelist = [
  process.env.FRONTEND_URL,
  "https://jouvemanagement-server-production.up.railway.app/api/auth/login",
];

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

const PORT = parseInt(process.env.PORT!, 10) || 3000; // Puerto de tu elección
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

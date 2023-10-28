import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
app.use(express.json());
dotenv.config();

// Llamar DB

// Configurate CORS
// const whitelist = [process.env.FRONTEND_URL];

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       // El origen del request esta permitido
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
// app.use(cors());

// Routing
app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

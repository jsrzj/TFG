import "dotenv/config";
import "./database/config.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { crearRoles } from "./libs/initialSetup.js";
import peliculasRoutes from "./routes/peliculas.routes.js";
import cors from "cors";
import path from 'path';

const app = express();
const __dirname = path.resolve();

crearRoles();

//Middlewares
const whiteList = [process.env.ORIGIN];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      else {
        return callback(`Error de CORS origin no autorizado`);
      } 
    }
  })
);

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/peliculas", peliculasRoutes);

app.get('/', (req, res) => {
  res.send('Home');
});

//Listen
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


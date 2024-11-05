require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import { configCors } from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8888;

//config cors
configCors(app);
// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
// connection();

// config cookie-parser
app.use(cookieParser());

// init web routes;
initApiRoutes(app);
// initWebRoutes(app);

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("jwt backend is running on the port =  " + PORT);
});

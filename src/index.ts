import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import Observation from "./models/observation";

dotenv.config();

mongoose.connect("mongodb://localhost:27017/weather-gram");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req: Request, res: Response) => {
  res.render("test");
});

app.get("/newobservation", async (req: Request, res: Response) => {
  const obs = new Observation({
    user: "Josh",
    location: "Canberra",
    feelslike: "Mild",
    content: "A nice summer's day!",
  });
  await obs.save();
  res.send(obs);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import methodOverride from "method-override";
import { Observation } from "./models/observation";

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
app.set("views", path.join(__dirname, "../src/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

/**
 * Home page route
 */
app.get("/", (req: Request, res: Response) => {
  res.render("test");
});

/**
 * View all observations
 */
app.get("/observations", async (req: Request, res: Response) => {
  const observations = await Observation.find({});
  res.render("observations/index", { observations });
});

/**
 * Create an observation
 */
app.get("/observations/new", (req: Request, res: Response) => {
  res.render("observations/new");
});

app.post("/observations", async (req: Request, res: Response) => {
  const observation = Observation.build(req.body.observation);
  try {
    await observation.save();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  res.redirect(`/observations/${observation._id}`);
});

/**
 * View observation details
 */
app.get("/observations/:id", async (req: Request, res: Response) => {
  const observation = await Observation.findById(req.params.id);
  res.render("observations/details", { observation });
});

/**
 * Edit observation
 */
app.get("/observations/:id/edit", async (req: Request, res: Response) => {
  const observation = await Observation.findById(req.params.id);
  res.render("observations/edit", { observation });
});

app.patch("/observations/:id", async (req: Request, res: Response) => {
  try {
    const observation = await Observation.findByIdAndUpdate(
      req.params.id,
      req.body.observation,
      { new: true }
    );
    observation
      ? res.redirect(`/observations/${observation._id}`)
      : res.redirect("/observations");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});

/**
 * Delete Observation
 */
app.delete("/observations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Observation.findByIdAndDelete(id);
  res.redirect("/observations");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

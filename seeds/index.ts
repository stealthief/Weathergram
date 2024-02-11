import mongoose from "mongoose";
import { Observation } from "../src/models/observation";
const suburbs = require("./suburbs");
const feel = require("./feelslike");
const names = require("./names");

mongoose.connect("mongodb://localhost:27017/weather-gram");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

function randomPicker(size: number): number {
  return Math.floor(Math.random() * size);
}

const seedDB = async () => {
  await Observation.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const sIdx: number = randomPicker(suburbs.length);
    const fIdx: number = randomPicker(feel.length);
    const nIdx: number = randomPicker(names.length);
    const obs = new Observation({
      user: `${names[nIdx]}`,
      location: `${suburbs[sIdx].suburb}, ${suburbs[sIdx].state}`,
      feelsLike: `${feel[fIdx]}`,
    });
    await obs.save();
  }
  db.close();
};

seedDB();

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req: Request, res: Response) => {
  res.render("test");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

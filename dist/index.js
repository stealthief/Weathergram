"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const observation_1 = __importDefault(require("./models/observation"));
dotenv_1.default.config();
mongoose_1.default.connect("mongodb://localhost:27017/weather-gram");
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "Mongo connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.get("/", (req, res) => {
    res.render("test");
});
app.get("/newobservation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obs = new observation_1.default({
        user: "Josh",
        location: "Canberra",
        feelslike: "Mild",
        content: "A nice summer's day!",
    });
    yield obs.save();
    res.send(obs);
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

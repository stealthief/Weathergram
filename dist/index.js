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
const method_override_1 = __importDefault(require("method-override"));
const observation_1 = require("./models/observation");
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
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, method_override_1.default)("_method"));
/**
 * Home page route
 */
app.get("/", (req, res) => {
    res.render("test");
});
/**
 * View all observations
 */
app.get("/observations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const observations = yield observation_1.Observation.find({});
    res.render("observations/index", { observations });
}));
/**
 * Create an observation
 */
app.get("/observations/new", (req, res) => {
    res.render("observations/new");
});
app.post("/observations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const observation = observation_1.Observation.build(req.body.observation);
    try {
        yield observation.save();
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
    res.redirect(`/observations/${observation._id}`);
}));
/**
 * View observation details
 */
app.get("/observations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const observation = yield observation_1.Observation.findById(req.params.id);
    res.render("observations/details", { observation });
}));
/**
 * Edit observation
 */
app.get("/observations/:id/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const observation = yield observation_1.Observation.findById(req.params.id);
    res.render("observations/edit", { observation });
}));
app.patch("/observations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const observation = yield observation_1.Observation.findByIdAndUpdate(req.params.id, req.body.observation, { new: true });
        observation
            ? res.redirect(`/observations/${observation._id}`)
            : res.redirect("/observations");
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}));
/**
 * Delete Observation
 */
app.delete("/observations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield observation_1.Observation.findByIdAndDelete(id);
    res.redirect("/observations");
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

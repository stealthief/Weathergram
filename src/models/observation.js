"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observation = void 0;
var mongoose_1 = require("mongoose");
var ObservationSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    location: { type: String, required: true },
    feelsLike: { type: String, required: true },
    content: String,
    comments: [String],
    photo: String,
});
ObservationSchema.static("build", function build(obs) {
    return new Observation(obs);
});
var Observation = (0, mongoose_1.model)("Observation", ObservationSchema);
exports.Observation = Observation;

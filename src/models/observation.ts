import mongoose, { Schema } from "mongoose";
Schema: mongoose.Schema;

const ObservationSchema = new Schema({
  user: String,
  location: String,
  feelsLike: String,
  content: String,
  comments: [String],
  photo: String,
});

export default mongoose.model("Observation", ObservationSchema);

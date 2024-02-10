import { Schema, model } from "mongoose";

interface IObservation {
  user: string;
  location: string;
  feelsLike: string;
  content: string;
  comments: [string];
  photo: string;
}

const ObservationSchema = new Schema<IObservation>({
  user: { type: String, required: true },
  location: { type: String, required: true },
  feelsLike: { type: String, required: true },
  content: String,
  comments: [String],
  photo: String,
});

const Observation = model<IObservation>("Observation", ObservationSchema);

export default Observation;

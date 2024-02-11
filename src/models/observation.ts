import mongoose, { Model, Schema, model } from "mongoose";

interface IObservation {
  user: string;
  location: string;
  feelsLike: string;
  content?: string;
  comments?: [string];
  photo?: string;
}

interface ObservationModel extends Model<IObservation> {
  build(attr: IObservation): any;
}

const ObservationSchema = new Schema<IObservation, ObservationModel>({
  user: { type: String, required: true },
  location: { type: String, required: true },
  feelsLike: { type: String, required: true },
  content: String,
  comments: [String],
  photo: String,
});

ObservationSchema.static("build", function build(obs: IObservation) {
  return new Observation(obs);
});

const Observation = model<IObservation, ObservationModel>(
  "Observation",
  ObservationSchema
);

export { Observation };

import { Schema, model, Document } from 'mongoose';

interface ITreatment extends Document {
  massage: string;
  price: number;
  time: string;
}

const TreatmentSchema: Schema = new Schema({
  massage: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true }
});

export default model<ITreatment>('Treatment', TreatmentSchema);

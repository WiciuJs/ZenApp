import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  startDate: Date;
  endDate: Date;
  duration: number;
  treatment: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
}
const RegistrationSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  treatment: { type: Schema.Types.ObjectId, ref: 'Treatment', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});
export default mongoose.model<IRegistration>('Registration', RegistrationSchema);

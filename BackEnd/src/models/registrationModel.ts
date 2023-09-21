import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  startDate: Date;
  endDate: Date;
  duration: number;
  name: string;
  customer: mongoose.Types.ObjectId;
}
const RegistrationSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  name: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
});
export default mongoose.model<IRegistration>('Registration', RegistrationSchema);

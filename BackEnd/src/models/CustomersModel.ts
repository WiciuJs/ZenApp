import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  surname: string;
  age: number;
  comments: string;
  mail: string;
  phoneNumber: string;
  registrations: Types.ObjectId[];
}

const CustomerSchema: Schema<ICustomer> = new Schema<ICustomer>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  comments: { type: String },
  mail: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);

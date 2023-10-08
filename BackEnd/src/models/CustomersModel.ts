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
  age: {
    type: Number,
    required: true,
    min: [0, 'Wiek nie może być ujemny.'],
    max: [100, 'Wiek nie może przekraczać 100 lat.'],
  },
  comments: { type: String },
  mail: { type: String, required: true, unique: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
   
  },
  registrations: [{ type: Schema.Types.ObjectId, ref: 'Registration' }],
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);

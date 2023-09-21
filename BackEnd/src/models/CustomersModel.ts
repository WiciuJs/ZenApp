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
  age: { type: Number, required: true, min: 0 }, 
  comments: { type: String },
  mail: { type: String, required: true, unique: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: (value: string) => /^\d{9}$/.test(value), 
      message: 'Numer telefonu musi zawierać dokładnie 9 cyfr.',
    },
  },
  registrations: [{ type: Schema.Types.ObjectId, ref: "Registration" }],
});

export default mongoose.model<ICustomer>("Customer", CustomerSchema);

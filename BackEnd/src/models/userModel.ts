import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  age: number;
  comments: string;
  mail: string;
  phoneNumber: string;
  registrations: Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  comments: { type: String },
  mail: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  registrations: [{ type: Schema.Types.ObjectId, ref: 'Registration' }],
});

export default mongoose.model<IUser>('User', UserSchema);

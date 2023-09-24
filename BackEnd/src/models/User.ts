import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

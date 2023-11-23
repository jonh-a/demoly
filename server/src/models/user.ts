import { Schema, model } from 'mongoose';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const UserModel = model<IUser>('user', UserSchema);
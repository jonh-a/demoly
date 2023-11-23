import { Schema, model } from 'mongoose';

export interface IWhitelistedUser {
  _id?: string;
  email: string;
}

const WhitelistedUserSchema = new Schema<IWhitelistedUser>({
  email: { type: String, required: true, unique: true },
});

export const WhitelistedUserModel = model<IWhitelistedUser>('whitelistedUser', WhitelistedUserSchema);
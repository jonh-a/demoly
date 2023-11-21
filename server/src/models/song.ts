import { Schema, model } from "mongoose";

export interface ISong {
  _id?: string;
  name: string;
  userID: string;
  notes: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const SongSchema = new Schema<ISong>({
  name: { type: String, required: true },
  userID: { type: String, required: true },
  notes: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: false },
  updatedAt: { type: String, required: false },
})

export const SongModel = model<ISong>("song", SongSchema)
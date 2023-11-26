import { Schema, model } from 'mongoose';

export interface ISong {
  _id?: string;
  name: string;
  userID: string;
  notes: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  audio: string;
  takes: string[];
}

const SongSchema = new Schema<ISong>({
  name: { type: String, required: true },
  userID: { type: String, required: true },
  notes: { type: String, required: false, default: ' ' },
  content: { type: String, required: false, default: ' ' },
  createdAt: { type: String, required: false },
  updatedAt: { type: String, required: false },
  audio: { type: String, required: false, default: '' },
  takes: { type: [String], required: false, default: [] },
});

export const SongModel = model<ISong>('song', SongSchema);
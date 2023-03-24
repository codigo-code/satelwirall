import { IUser } from 'satelnet-types';
import { Schema, model, connect } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true},
  role: { type: String, required: true },
  updatedAt: { type: Date },
  createdAt: { type: Date },
  updatedBy : { type: Schema.Types.ObjectId, ref: 'User' },
  lastLogin :  { type: Date },
});

export const User = model<IUser>('User', userSchema);
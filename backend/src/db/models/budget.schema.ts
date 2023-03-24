import { IBudget } from "satelnet-types";
import { Schema, model } from "mongoose";

const budgetSchema = new Schema<IBudget>({
  seqId: { type: Number },
  work: { type: String, required: true },
  subWork: { type: String, required: true },
  subWork2: { type: String, required: true },
  company: { type: String, required: true },
  dock: { type: String },
  zone: { type: String, required: true },
  boat: { type: String },
  status: { type: String },
  aditionalNotes: { type: String },
  costs: { type: [] },
  updatedAt: { type: Date },
  createdAt: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Budget = model<IBudget>("Budget", budgetSchema);

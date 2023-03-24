import { ICounter } from "satelnet-types";
import { Schema, model } from "mongoose";

const counterSchema = new Schema<ICounter>({
  counterId: { type: String, unique: true, required: true },
  sequence_value: { type: Number, default: 0 },
});

export const Counter = model<ICounter>("Counter", counterSchema);

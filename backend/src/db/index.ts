import { ICounter } from "satelnet-types";
import mongoose from "mongoose";
import { Counter } from "./models/counter.schema";

export const connectDB = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017?retryWrites=true&w=majority`, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    })
    .then((db) => {
      console.log(`Connected successfully to ${db.connection.name}`);
    })
    .catch((err) => {
      console.log("connection error: ");
    });
};

export const getNextSequenceValue = async (
  counterId: string
): Promise<ICounter | null> => {
  let sequenceDocument = await Counter.findOneAndUpdate(
    { counterId },
    {
      $inc: { sequence_value: 1 },
    },
    { returnOriginal: false, upsert: true, new:true }
  );
  return sequenceDocument;
};

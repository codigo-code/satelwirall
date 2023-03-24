import { ICoordination } from "satelnet-types";
import { Schema, model } from "mongoose";

const coordinationSchema = new Schema<ICoordination>({
    seqId: { type: Number },
    budget: { type: Schema.Types.ObjectId, ref: "Budget" },
    contractor: { type: String },
    assignedTechnician: { type: String },
    numberOfTechnicians: { type: Number },
    allocatedFund: { type: Number },
    assignedFund: { type: Number },
    associatedExpenses: { type: Number },
    startDate: { type: String },
    endDate: { type: String },
    progress: { type: Number }, // /0/50/100
    applyCharge: { type: String },// yes/not
    developedActivity: { type: String },
    stoppedDays: { type: Number },//dias de para
    daysFor: { type: Number },
    fortnight: { type: Number },// quincena
    updatedAt: { type: Date },
    createdAt: { type: Date },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Coordination = model<ICoordination>("Coordination", coordinationSchema);

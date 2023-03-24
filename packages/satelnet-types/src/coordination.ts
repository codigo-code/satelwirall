import { GenericInterface } from './common';
import { IBudget } from "./budget";
import { IUser } from "./user";
export interface ICoordination extends GenericInterface {
  _id?: string;
  seqId?: number;
  budget: IBudget;
  contractor: string;
  assignedTechnician: string;
  numberOfTechnicians: number;
  allocatedFund: number;
  assignedFund: number;
  associatedExpenses: number;
  startDate: string;
  endDate: string
  progress: number // /0/50/100
  applyCharge: string // yes/not
  developedActivity: string
  stoppedDays: number//dias de para
  daysFor: number
  fortnight: number// quincena
  updatedBy?: IUser
  createdBy?: IUser
  status: string
}

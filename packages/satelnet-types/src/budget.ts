import { GenericInterface } from "./common";
import { IUser } from "./user";
export interface ICost {
  id:number,
  description: string;
  count: number;
  singleCost: number;
}
// TODO: improve required fields
export interface IBudget extends GenericInterface {
  _id?: string;
  seqId?: number;
  work?: string;
  subWork?: string;
  subWork2?: string;
  company?: string;
  zone?: string;
  dock?: string;
  boat?: string;
  status?: string;
  aditionalNotes?: string;
  updatedBy?: IUser;
  createdBy?: IUser;
  costs?: ICost[];
}

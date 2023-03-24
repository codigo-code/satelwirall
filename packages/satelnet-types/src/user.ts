import { GenericInterface } from "./common";
export interface IUser extends GenericInterface {
    id?: any;
    name: string;
    role: 'admin' | 'comercial' | 'operational' | 'none';
    email: string;
    updatedBy?: IUser;
    lastLogin?: Date
}
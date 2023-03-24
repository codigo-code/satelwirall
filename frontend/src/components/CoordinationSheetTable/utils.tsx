import { ICoordination } from "satelnet-types";

export interface iTableCoordination extends ICoordination {
  updatedByEmail?: string;
  createdByEmail?: string;
}

export const getFormattedData = (
  coordinations: ICoordination[]
): iTableCoordination[] => {
    return coordinations.map((coordination: ICoordination) => {
      return {
        ...coordination,
        updatedByEmail: coordination.updatedBy?.email ?? "",
        createdByEmail: coordination.createdBy?.email ?? "",
      };
    });
};

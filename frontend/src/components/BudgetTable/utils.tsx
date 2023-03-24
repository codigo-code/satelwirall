import { IBudget } from "satelnet-types";

export interface iTableBudget extends IBudget {
  updatedByEmail?: string;
  createdByEmail?: string;
}

export const getFormattedData = (budgets: IBudget[]): iTableBudget[] => {
    return budgets.map((budget: IBudget) => {
      return {
        ...budget,
        updatedByEmail: budget.updatedBy?.email ?? "",
        createdByEmail: budget.createdBy?.email ?? "",
      };
    });
};

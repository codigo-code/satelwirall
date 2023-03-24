import { IBudget } from "satelnet-types";
import { getNextSequenceValue } from "../db";
import { Budget } from "../db/models/budget.schema";

export const createBudget = async (data: IBudget) => {
  const budget = new Budget(data);
  return await (await budget.save({})).populate(["createdBy", "updatedBy"])
};

export const updateBudget = async (data: IBudget) => {
  //if data not contain ._id it is a new budget
  if (!data._id) {
    //creating a new seq_id
    const newSeqVaule = await getNextSequenceValue("budgetID");
    const budget = new Budget(data);
    budget.seqId = newSeqVaule?.sequence_value;
    //setting up created by
    budget.createdBy = budget.updatedBy;
    const savedData = await budget.save();
    return await savedData.populate(["createdBy", "updatedBy"]);
  }
  const budget = await Budget.findOneAndUpdate({ _id: data?._id }, data, {
    returnOriginal: false,
  })
    .populate("createdBy").populate("updatedBy")
    .exec();
  return budget;
};

export const deleteBudget : any  = async (id: string)  => {
  const deleteResult = Budget.deleteOne({ _id: id });
  return deleteResult;
};

export const getBudgets = async () => {
  const budgets = await Budget.find().populate(["createdBy","updatedBy"]).exec();
  return budgets;
};

export const getBudgetsByStatus = async (status: string[]) => {
  const budgets = Budget.find({ status: { $in: status } }).populate(["createdBy","updatedBy"]).exec();
  return budgets;
};

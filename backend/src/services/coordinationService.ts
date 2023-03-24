import { ICoordination } from "satelnet-types";
import { getNextSequenceValue } from "../db";
import { Coordination } from "../db/models/coordination.schema";

export const createCoordination = async (data: ICoordination) => {
  const coordination = new Coordination(data);
  return await (
    await coordination.save({})
  ).populate(["createdBy", "updatedBy"]);
};

export const updateCoordination = async (data: ICoordination) => {
  //if data not contain ._id it is a new Coordination
  if (!data._id) {
    //creating a new seq_id
    const newSeqVaule = await getNextSequenceValue("coordinationID");
    const coordination = new Coordination(data);
    coordination.seqId = newSeqVaule?.sequence_value;
    //setting up created by
    coordination.createdBy = coordination.updatedBy;
    const savedData = await coordination.save();
    return await savedData.populate(["budget", "createdBy", "updatedBy"]);
  }
  const coordination = await Coordination.findOneAndUpdate(
    { _id: data?._id },
    data,
    {
      returnOriginal: false,
    }
  )
    .populate(["budget", "createdBy", "updatedBy"])
    .exec();
  return coordination;
};

export const deleteCoordination: any = async (id: string) => {
  const deleteResult = Coordination.deleteOne({ _id: id });
  return deleteResult;
};

export const getCoordinations = async () => {
  const coordinations = await Coordination.find().populate([
    "budget",
    "createdBy",
    "updatedBy",
  ]);
  return coordinations;
};

export const getCoordinationsByStatus = async (status: string[]) => {
  const coordinations = Coordination.find({ status: { $in: status } })
    .populate(["budget", "createdBy", "updatedBy"])
    .exec();
  return coordinations;
};

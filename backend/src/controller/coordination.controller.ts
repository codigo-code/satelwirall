import {
    createCoordination,
    deleteCoordination,
    getCoordinations,
    getCoordinationsByStatus,
    updateCoordination,
} from "./../services/coordinationService";
import { ICoordination, IUser } from "satelnet-types";
import { Request, Response } from "express";

export const postCoordination = async (req: Request, res: Response) => {
    const data: ICoordination = req.body;
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.updatedBy = req.user as IUser;
    // if user with email already exists return 403
    const savedCoordination = await createCoordination(data);
    if (!savedCoordination) {
        res.sendStatus(403);
    } else {
        res.send(savedCoordination).status(200);
    }
};

export const putCoordination = async (req: Request, res: Response) => {
    const data: ICoordination = req.body;
    data.updatedAt = new Date();
    data.updatedBy = req.user as IUser;
    const updatedCoordination = await updateCoordination(data);
    if (!updatedCoordination) res.send("Coordination not found").status(404);
    res.send(updatedCoordination);
};

export const delCoordination = async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) res.send("Bad request").status(400);
    const deleteResult = deleteCoordination(id as string);
    if (!deleteResult) res.send("Coordination not found").status(404);
    res.send(deleteResult);
};

export const getAllCoordinations = async (req: Request, res: Response) => {
    const allCoordinations = await getCoordinations();
    res.send(allCoordinations).status(200);
};

export const getCoordinationsByStatusType = async (req: Request, res: Response) => {
    const queryArray = req?.query?.status as string;
    const allCoordinations = await getCoordinationsByStatus(queryArray.split(","));
    res.send(allCoordinations).status(200);
};

import { ICoordination } from "satelnet-types";
const URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE as string;

const udpdateOrCreateCoordination = (coordination: ICoordination): Promise<ICoordination> => {

    return fetch(`${URL_BASE}/coordination`, {
        headers: {
            "Content-Type": "application/json",
            pragma: "no-cache",
            "cache-control": "no-cache",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(coordination),
    }).then((data) => {
        return data.json();
    }) as Promise<ICoordination>;
};

const deleteCoordination = (id: string): Promise<any> => {
    return fetch(`${URL_BASE}/coordination?id=${id}`, {
        headers: {
            "Content-Type": "application/json",
            pragma: "no-cache",
            "cache-control": "no-cache",
        },
        method: "DELETE",
        credentials: "include",
    }).then((data) => {
        return data.json();
    }) as Promise<ICoordination>;
};

const getCoordinationList = (): Promise<ICoordination[]> => {
    return fetch(`${URL_BASE}/coordination/list`, {
        headers: {
            "Content-Type": "application/json",
            pragma: "no-cache",
            "cache-control": "no-cache",
        },
        method: "GET",
        credentials: "include",
    })
        .then((data) => data.json())
        .catch((err) => {
            return err;
        }) as Promise<ICoordination[]>;
};

const getCoordinationListByStatus = (status: string[]): Promise<ICoordination[]> => {
    return fetch(`${URL_BASE}/coordination/list-by-status?status=${status.join(',')}`, {
        headers: {
            "Content-Type": "application/json",
            pragma: "no-cache",
            "cache-control": "no-cache",
        },
        method: "GET",
        credentials: "include",
    })
        .then((data) => data.json())
        .catch((err) => {
            return err;
        }) as Promise<ICoordination[]>;
};
export {
    udpdateOrCreateCoordination,
    getCoordinationList,
    getCoordinationListByStatus,
    deleteCoordination,
};

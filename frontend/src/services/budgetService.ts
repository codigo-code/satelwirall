import { IBudget } from "satelnet-types";
const URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE as string;

const udpdateOrCreateBudget = (budget: IBudget): Promise<IBudget> => {
  return fetch(`${URL_BASE}/budget`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify(budget),
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return err;
    }) as Promise<IBudget>;
};

const deleteBudget = (id: string): Promise<any> => {
  return fetch(`${URL_BASE}/budget?id=${id}`, {
    headers: {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
    method: "DELETE",
    credentials: "include",
  }).then((data) => {
    return data.json();
  }) as Promise<IBudget>;
};

const getBudgetList = (): Promise<IBudget[]> => {
  return fetch(`${URL_BASE}/budget/list`, {
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
    }) as Promise<IBudget[]>;
};

const getBudgetListByStatus = (status: string[]): Promise<IBudget[]> => {
  return fetch(`${URL_BASE}/budget/list-by-status?status=${status.join(",")}`, {
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
    }) as Promise<IBudget[]>;
};
export {
  udpdateOrCreateBudget,
  getBudgetList,
  getBudgetListByStatus,
  deleteBudget,
};

import EditableTable from "../EditableTable";
import { IBudget } from "satelnet-types";
import { Column } from "@material-table/core";
import { Action } from "material-table";
import { BUDGET_STATUSES } from "satelnet-constants";
import classnames from "classnames";
import { getFormattedData, iTableBudget } from "./utils";
import { useMemo } from "react";

export interface Props {
  view?: string;
  data: IBudget[];
  loading: boolean;
  tableTitle: string;
  actions?: Action<IBudget>[];
  toolbarComponent?: JSX.Element;
  options: any;
  styles: any;
}

const BudgetTable = ({
  view,
  data,
  loading,
  tableTitle,
  actions,
  toolbarComponent,
  options,
  styles,
}: Props) => {
  const columns: Array<Column<iTableBudget>> = [
    {
      title: "ID",
      field: "seqId",
      editable: "never",
      id: true,
    },
    {
      title: "Trabajo",
      field: "work",
      type: "string",
      editable: "never",
    },
    {
      title: "Empresa",
      field: "company",
      type: "string",
      editable: "never",
    },
    {
      title: "Zona",
      field: "zone",
      type: "string",
      editable: "never",
    },
    {
      title: "Ponton/Barco",
      field: "boat",
      type: "string",
      editable: "never",
    },
    {
      title: "Ponton o Muelle",
      field: "dock",
      type: "string",
      editable: "never",
    },
    {
      title: "Estado",
      field: "status",
      editable: "never",
      render: (rowData) => {
        const status = rowData.status;
        return (
          <span
            className={classnames("text-white font-semibold py-0 px-1", {
              "bg-blue-500": status === BUDGET_STATUSES.CONFIRMED,
              "bg-orange-400": status === BUDGET_STATUSES.DRAFT,
              "bg-green-400": status === BUDGET_STATUSES.APPROVED,
              " bg-yellow-500": status === BUDGET_STATUSES.COORDINATION,
              "bg-red-400": status === BUDGET_STATUSES.SUBMITTED,
              "bg-slate-900": status === BUDGET_STATUSES.REJECTED,
            })}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Creado por",
      field: "createdByEmail",
      type: "string",
      editable: "never",
    },
    {
      title: "Actualizado por",
      field: "updatedByEmail",
      type: "string",
      editable: "never",
    },
  ];
  const formattedData = useMemo(() => getFormattedData(data), [data]);
  return (
    <div className="w-full overflow-scroll border rounded shadow-sm shadow-slate-300">
      {EditableTable<IBudget>({
        title: tableTitle,
        data: formattedData,
        columns,
        options,
        styles,
        loading,
        actions,
        toolbarComponent,
      })}
    </div>
  );
};

export default BudgetTable;

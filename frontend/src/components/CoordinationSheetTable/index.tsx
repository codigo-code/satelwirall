import EditableTable from "../EditableTable";
import { ICoordination } from "satelnet-types";
import { Column } from "@material-table/core";
import { Action } from "material-table";
import { Icons } from "@material-table/core";
import classnames from "classnames";
import {useMemo} from "react";
import { getFormattedData, iTableCoordination } from "./utils";
interface IEdit {
  onRowAdd: (newData: ICoordination) => Promise<ICoordination>;
  onRowUpdate: (
    newData: ICoordination,
    oldData: ICoordination
  ) => Promise<ICoordination>;
  // onRowDelete: (oldData: ICoordination) => Promise<ICoordination>;
  onRowUpdateCancelled?: (rowData: ICoordination) => Promise<ICoordination>;
  onRowAddCancelled?: (rowData: ICoordination) => Promise<ICoordination>;
}

interface InitialEditValue {
  budgetId?: number;
  company?: string;
  work?: string;
}
export interface Props {
  initialEditValue?: InitialEditValue;
  data: ICoordination[];
  loading: boolean;
  tableTitle: string;
  actions?: Action<ICoordination>[];
  toolbarComponent?: JSX.Element;
  options: any;
  onEdit?: IEdit;
  styles: any;
  icons: Icons;
}

const CoordinationSheetTable = ({
  data,
  loading,
  tableTitle,
  actions,
  toolbarComponent,
  options,
  onEdit,
  initialEditValue,
  styles,
  icons,
}: Props) => {
  
  const columns: Array<Column<iTableCoordination>> = useMemo(() =>  [
    {
      title: "ID",
      field: "seqId",
      type: "string",
      align: "center",
      editable: "never",
      id: true,
      render: (rowData) => <span key={rowData.seqId}>{rowData.seqId}</span>,
    },
    {
      title: "Presupuesto",
      field: "budget.seqId",
      type: "string",
      align: "center",
      editable: "never",
      ...(initialEditValue?.budgetId
        ? { initialEditValue: initialEditValue?.budgetId }
        : {}),
      cellStyle: { textAlign: "center" },
    },
    {
      title: "Trabajo a desarrollar",
      field: "budget.work",
      type: "string",
      editable: "never",
      initialEditValue: initialEditValue!.work,
    },
    {
      title: "Empresa",
      field: "budget.company",
      type: "string",
      align: "center",
      editable: "never",
      ...(initialEditValue?.company
        ? { initialEditValue: initialEditValue?.company }
        : {}),
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
    // TODO: WE DONT KNOW THE DATA TO PUT HERE
    {
      title: "Contratista",
      field: "contractor",
      type: "string",
      align: "center",
      initialEditValue: "0",
      lookup: {
        "0": "1",
        "2": "2",
        "3": "3",
      },
    },
    {
      title: "Tecnico asignado",
      field: "assignedTechnician",
      align: "center",
      type: "string",
    },
    {
      title: "Cantidad de tecnicos",
      field: "numberOfTechnicians",
      type: "string",
      initialEditValue: "",
    },
    {
      title: "Fondos asignados",
      field: "assignedFund",
      type: "numeric",
      align: "center",
    },
    {
      title: "Gastos asociados",
      field: "associatedExpenses",
      type: "numeric",
      align: "center",
    },
    {
      title: "Fecha de inicio",
      field: "startDate",
      type: "date",
      align: "center",
    },
    {
      title: "Fecha termino",
      field: "endDate",
      type: "date",
      align: "center",
    },
    {
      title: "Estado avance",
      field: "progress",
      type: "string",
      align: "center",
      initialEditValue: "0",
      lookup: {
        "0": "0%",
        "50": "50%",
        "100": "100%",
      },
      render: (rowData) => {
        return (
          <div
            className={classnames("w-15 font-bold text-center", {
              "bg-green-500-gradient-r-50": rowData.progress === 50,
              "bg-green-500": rowData.progress === 100,
              "bg-green-50": rowData.progress === 0,
            })}
          >
            <span> {rowData.progress}</span>
          </div>
        );
      },
    },
    {
      title: "Dias de para",
      field: "stoppedDays",
      align: "center",
      type: "numeric",
      initialEditValue: 0,
    },
    {
      title: "Quincena",
      field: "fortnight",
      align: "center",
      type: "numeric",
      initialEditValue: 0,
    },
    {
      title: "Actividad desarrollada",
      field: "developedActivity",
      type: "string",
      initialEditValue: "",
    },
    {
      title: "Aplica cobro",
      field: "applyCharge",
      align: "center",
      initialEditValue: "no",
      lookup: {
        yes: "si",
        no: "no",
      },
    },
  ], [initialEditValue]);

  const formattedData = useMemo(()=>getFormattedData(data),[data])

  return (
    <div className="w-full overflow-scroll border rounded shadow-sm shadow-slate-300">
      <EditableTable
        title={tableTitle}
        loading={loading}
        data={formattedData}
        columns={columns}
        options={options}
        styles={styles}
        actions={actions}
        toolbarComponent={toolbarComponent}
        onEdit={onEdit ? onEdit : undefined}
        icons={icons}
      />
    </div>
  );
};

export default CoordinationSheetTable;

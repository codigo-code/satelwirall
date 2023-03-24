import EditableTable from "../../components/EditableTable";
import { IUser } from "satelnet-types";
import { Column } from "@material-table/core";
import { getFormattedData } from "./utils";
import { iTableUser } from "./types";

export interface Props {
  data: IUser[];
  createUser: (newData: iTableUser) => Promise<iTableUser>;
  updateUser: (newData: iTableUser, oldData: iTableUser) => Promise<iTableUser>;
  loading: boolean;
}

const Admin = ({ data, createUser, updateUser, loading }: Props) => {
  const columns: Array<Column<iTableUser>> = [
    { title: "Name", field: "name", type: "string", editable: "always" },
    {
      editable: "onAdd",
      title: "Email",
      field: "email",
      type: "string",
      // validate: (rowData) => regexEmail.test(rowData.email) ? { isValid : true, helperText:undefined} :  { isValid : false, helperText:'invalid'},
      editPlaceholder: "example@gmail.com",
      id:true
    },
    {
      editable: "always",
      title: "Access role",
      field: "role",
      tooltip: "Grant access",
      align: "center",
      initialEditValue: "none",
      cellStyle: { alignItems: "center", textAlign: "center" },
      lookup: {
        admin: "Admin",
        comercial: "Comercial",
        operational: "Operational",
        operational_commercial: "Operational/Commercial",
        none: "None",
      },
    },
    {
      title: "Actualizado por",
      field: "updatedBy",
      type: "string",
      editable: "never",
    },
    {
      title: "Ultima actualizacion",
      field: "updatedAt",
      type: "datetime",
      editable: "never",
    },
  ];
  const formatedData: iTableUser[] = getFormattedData(data);
  return (
    <div className="container mx-auto mt-4">
      {EditableTable<iTableUser>({
        title: "Users management",
        onEdit: {
          onRowAdd: createUser,
          onRowUpdate: updateUser,
        },
        data: formatedData,
        columns,
        options: {
          emptyRowsText: 'No hay registros para mostrar',
          paging: false,
          emptyRowsWhenPaging: false,
          tableWidth: "full",
        },
        styles: { padding: "8px" },
        loading,
      })}
    </div>
  );
};

export default Admin;

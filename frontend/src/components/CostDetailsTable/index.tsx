import { ICost } from "satelnet-types";
import { Column } from "material-table";
import EditableTable from "../EditableTable";
interface IEdit {
  onRowAdd: (newData: ICost) => Promise<ICost>;
  onRowUpdate: (
    newData: ICost,
    oldData: ICost
  ) => Promise<ICost>;
  onRowDelete: (
    oldData: ICost
  ) => Promise<ICost>;
}
interface IProps {
  data: ICost[];
  onEdit?: IEdit;
  options: any;
}

const CostDetailsTable = ({ data, onEdit, options }: IProps) => {

  const columns: Array<Column<ICost>> = [
    {
      title: "ID",
      field: "id",
      type: "numeric",
      align: "center",
      editable: 'never',
    },
    {
      title: "Descripcion",
      field: "description",
      type: "string",
      align: "center",
    },
    {
      title: "Cantidad",
      field: "count",
      type: "numeric",
      align: "center",
    },
    {
      title: "Costo unitario",
      field: "singleCost",
      align: "center",
      type: "numeric",
    },
    {
      title: "Total",
      field: "total",
      align: "center",
      editable:'never',
      type: "numeric",
      render: (rowData) => {
        return <span> {rowData.singleCost * (rowData.count?? 0)}</span>
      }
    },
  ];
  return (
    <div className="container w-3/5 mx-auto mt-5">
      <EditableTable
        options={{
          paging: false,
          emptyRowsWhenPaging: false,
          tableWidth: "full",
          search: false,
          title: null,
          toolbar: onEdit,
          headerStyle: {
            position: "sticky",
            top: "0",
            textAlign:'start',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          },
          cellStyle:{
            textAlign:'start',
            whiteSpace: 'nowrap',
          },
          bodyHeight: "300px",
        }}
        data={data}
        title={""}
        columns={columns}
        loading={false}
        onEdit={onEdit ? onEdit : undefined}
      />
    </div>
  );
};

export default CostDetailsTable;

import MaterialTable, {
  Action,
  Column,
  MTableToolbar,
  Icons,
} from "@material-table/core";
import { useMemo, useRef } from "react";
import { tableIcons } from "./icons";

interface IOnEdit<T> {
  onRowAdd: (newData: T) => Promise<T>;
  onRowUpdate: (newData: T, oldData: any) => Promise<T>;
  onRowDelete?: (oldData: T) => Promise<T>;
}

interface Props<T extends object> {
  title: string;
  columns: Array<Column<T>>;
  data: Array<T>;
  options: {
    [key: string]: any;
  };
  styles?: {};
  loading: boolean;
  onEdit?: IOnEdit<T>;
  actions?: Action<T>[];
  toolbarComponent?: JSX.Element;
  icons?: Icons;
}

export default function EditableTable<T extends object>({
  title,
  columns,
  data,
  options,
  styles,
  loading,
  onEdit,
  actions,
  toolbarComponent,
  icons,
}: Props<T>) {
  const tableRef = useRef(null);
  return (
    <MaterialTable
      ref={tableRef}
      style={styles}
      options={{ ...options, showEmptyDataSourceMessage: false }}
      actions={actions}
      title={title}
      icons={{ ...tableIcons, ...icons }}
      columns={columns}
      data={data}
      isLoading={loading}
      editable={onEdit ? onEdit : {}}
      components={
        toolbarComponent
          ? {
              Toolbar: (props) => (
                <>
                  <MTableToolbar {...props} />
                  {toolbarComponent}
                </>
              ),
            }
          : {}
      }
    />
  );
}

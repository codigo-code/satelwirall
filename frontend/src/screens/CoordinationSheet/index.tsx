import { IBudget, ICoordination } from "satelnet-types";
import { isArray } from "lodash";
import { Action } from "material-table";
import { forwardRef, useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { getBudgetListByStatus, udpdateOrCreateBudget } from "../../services";
import BudgetTable from "../../components/BudgetTable";
import CoordinationSheetTable from "../../components/CoordinationSheetTable";

import { COORDINATION_STATUSES, BUDGET_STATUSES } from "satelnet-constants";
import {
  getCoordinationList,
  udpdateOrCreateCoordination,
} from "../../services/coordinationService";
import { useSnackbar } from "notistack";
import SimpleDialog from "../../components/SimpleDialog";
import AbmBudgetForm from "../../components/AbmBudgetForm";
import { OPERATIONAL } from "../../constants/views";
import { Edit, RemoveRedEye, Add } from "@material-ui/icons";
const CoordinationSheet = () => {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>();
  const [selectedBudgetToShow, setSelectedBudgetToShow] =
    useState<IBudget | null>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [approvedBudgets, setApprovedBudgets] = useState<IBudget[]>([]);
  const [coordinations, setCoordinations] = useState<ICoordination[]>([]);

  useEffect(() => {
    //TODO: WHATS TYPES DO I HAVE TO SET UP?
    if (fetching) {
      setLoading(true);
      Promise.all([
        getBudgetListByStatus([BUDGET_STATUSES.APPROVED]).then((data) => {
          setApprovedBudgets(data);
        }),
        getCoordinationList().then((data) => {
          setCoordinations(data);
        }),
      ]).finally(() => {
        setLoading(false);
      });
      setFetching(false);
    }
  }, [fetching]);

  const budgetTableActions: Action<IBudget>[] = [
    {
      icon: () => <Edit />,
      tooltip: "Seleccionar",
      onClick(event, data) {
        event.preventDefault();
        if (!isArray(data)) {
          setSelectedBudget(data);
        }
      },
    },
  ];

  const coordinationTableActions: Action<ICoordination>[] = [
    {
      icon: () => <RemoveRedEye />,
      tooltip: "Ver presupuesto",
      onClick(event, data: any) {
        setSelectedBudgetToShow(data!.budget);
        setModalOpen(true);
      },
    },
  ];
  const size = useWindowSize();

  const onRowAdd = (newData: ICoordination): Promise<ICoordination> => {
    const coordinationToAdd: ICoordination = {
      ...newData,
      status: COORDINATION_STATUSES.ONGOING,
      ...(selectedBudget ? { budget: { ...selectedBudget } } : {}),
    };

    let budgetToUpdate: IBudget | undefined = selectedBudget
      ? {
          ...selectedBudget,
          status: BUDGET_STATUSES.COORDINATION,
        }
      : undefined;
    setLoading(true);

    Promise.all([
      udpdateOrCreateCoordination(coordinationToAdd).then((data) => {
        setLoading(true);
        setSelectedBudget(null);
      }),
      [...(budgetToUpdate ? [udpdateOrCreateBudget(budgetToUpdate)] : [])],
    ])
      .then((data) => {
        enqueueSnackbar("Coordinación de trabajo creada", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        setFetching(true);
      });
    return Promise.resolve(newData);
  };

  const onRowAddCancelled = (
    rowData: ICoordination
  ): Promise<ICoordination> => {
    setSelectedBudget(null);
    return Promise.resolve(rowData);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBudgetToShow(null);
  };

  return (
    <div className="container relative flex flex-col items-center justify-start w-full gap-3 m-auto mt-2 bg-slate-100">
      <BudgetTable
        styles={{ padding: "8px", height: `${size.height * 0.3}px` }}
        loading={loading}
        tableTitle="Mis Trabajos Pendientes"
        actions={budgetTableActions}
        data={approvedBudgets}
        options={{
          paging: false,
          emptyRowsWhenPaging: false,
          tableWidth: "full",
          headerStyle: {
            position: "sticky",
            top: "0",
            textAlign: "start",
            textDecoration: "none",
            whiteSpace: "nowrap",
          },
          cellStyle: {
            textAlign: "start",
            width: "100%",
            whiteSpace: "nowrap",
          },
          maxBodyHeight: `${size.height * 0.21}px`,
          emptyRowsText: "No hay registros para mostrar",
        }}
      />
      <CoordinationSheetTable
        icons={{
          Add: forwardRef((props, ref) => {
            return (
              <div
                className={` ${
                  selectedBudget ? "flex" : "hidden"
                } items-center justify-center gap-2 px-4 py-1 text-lg bg-green-500 hover:bg-green-40 rounded cursor-pointer w-max `}
                {...props}
                ref={ref}
              >
                <Add className="" /> Crear trabajo id {selectedBudget?.seqId}
              </div>
            );
          }),
        }}
        styles={{ padding: "8px", height: `${size.height * 0.55}px` }}
        actions={coordinationTableActions}
        initialEditValue={{
          budgetId: selectedBudget?.seqId,
          work: selectedBudget?.work,
          company: selectedBudget?.company,
        }}
        data={coordinations}
        tableTitle="Coordinacion de trabajo"
        loading={loading}
        onEdit={{
          onRowAdd,
          onRowUpdate: onRowAdd,
          // onRowDelete,
          onRowAddCancelled,
          onRowUpdateCancelled: onRowAddCancelled,
        }}
        options={{
          paging: false,
          emptyRowsWhenPaging: false,
          tableWidth: "full",
          headerStyle: {
            position: "sticky",
            top: "0",
            textAlign: "start",
            textDecoration: "none",
            whiteSpace: "nowrap",
          },
          cellStyle: {
            textAlign: "start",
            width: "100%",
            whiteSpace: "nowrap",
          },
          emptyRowsText: "No hay registros para mostrar",
          maxBodyHeight: `${size.height * 0.43}px`,
        }}
      />
      {selectedBudgetToShow && (
        <SimpleDialog isOpen={modalOpen} maxWidth="container">
          <AbmBudgetForm
            currentBudget={selectedBudgetToShow}
            handleClose={handleCloseModal}
            editable={false}
            view={OPERATIONAL}
          />
        </SimpleDialog>
      )}
    </div>
  );
};

export default CoordinationSheet;

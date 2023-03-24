import SimpleDialog from "../../components/SimpleDialog";
import BudgetTable from "../../components/BudgetTable";
import { Action } from "@material-table/core";
import { IBudget } from "satelnet-types";
import { MdModeEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import AbmBudgetForm from "../../components/AbmBudgetForm";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import {
  udpdateOrCreateBudget,
  getBudgetListByStatus,
  deleteBudget,
} from "../../services";
import { useSnackbar } from "notistack";

import { isArray } from "lodash";
import { COMMERCIAL, OPERATIONAL } from "../../constants/views";
import { useWindowSize } from "../../hooks/useWindowSize";
import { BUDGET_STATUSES } from "satelnet-constants";

interface IProps {
  view: string;
}

const CommercialOperational = ({ view }: IProps) => {
  const size = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<
    IBudget | null | undefined
  >(null);
  const [budgetDraftedList, setBudgetDraftedList] = useState<IBudget[]>([]);
  const [budgetSubmittedList, setBudgetSubmittedList] = useState<IBudget[]>([]);

  const [fetching, setFetching] = useState(true);
  const handleClose = () => {
    setModalOpen(false);
    setCurrentBudget(null);
  };

  const submitedActions: Action<IBudget>[] = [
    {
      icon: MdRemoveRedEye,
      tooltip: "Ver",
      onClick(event, data) {
        const currentBudgetResult = !isArray(data)
          ? budgetSubmittedList.find((budget) => budget.seqId === data?.seqId)
          : null;
        setCurrentBudget(currentBudgetResult);
        setEditable(false);
        setModalOpen(true);
      },
    },
  ];
  const draftedActions: Action<IBudget>[] = [
    {
      icon: MdModeEdit,
      tooltip: "Editar",
      onClick(event, data) {
        const currentBudgetResult = !isArray(data)
          ? budgetDraftedList.find((budget) => budget.seqId === data?.seqId)
          : null;
        setCurrentBudget(currentBudgetResult);
        setEditable(true);
        setModalOpen(true);
      },
    },
    ...(view === COMMERCIAL
      ? [
          {
            icon: MdDelete,
            tooltip: "Eliminar",
            onClick(event: any, data: IBudget | IBudget[]) {
              setLoading(true);
              if (!isArray(data)) {
                deleteBudget(data._id as string)
                  .then((data) => {
                    enqueueSnackbar("Eliminado", {
                      variant: "warning",
                    });
                  })
                  .catch(() => {
                    enqueueSnackbar("Error", {
                      variant: "error",
                    });
                  })
                  .finally(() => {
                    setFetching(true);
                  });
              }
            },
          },
        ]
      : []),
  ];

  useEffect(() => {
    try {
      if (fetching || view) {
        if (!loading) setLoading(true);
        Promise.all([
          getBudgetListByStatus([
            BUDGET_STATUSES.CONFIRMED,
            BUDGET_STATUSES.APPROVED,
            BUDGET_STATUSES.COORDINATION,
            BUDGET_STATUSES.REJECTED,
            ...(view !== OPERATIONAL ? [BUDGET_STATUSES.SUBMITTED] : []),
          ]).then((data) => {
            setBudgetSubmittedList(data ?? []);
          }),
          getBudgetListByStatus(
            view === OPERATIONAL
              ? [BUDGET_STATUSES.SUBMITTED]
              : [BUDGET_STATUSES.DRAFT]
          ).then((data) => {
            setBudgetDraftedList(data ?? []);
          }),
        ]).finally(() => {
          setLoading(false);
          setFetching(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetching, view]);

  const handleSave = (
    type: "draft" | "submit" | "approved" | "rejected",
    data: IBudget
  ) => {
    setLoading(true);
    const dataToSave: IBudget = {
      ...data,
      status:
        type === "rejected"
          ? BUDGET_STATUSES.REJECTED
          : type === "approved"
          ? BUDGET_STATUSES.APPROVED
          : type === "submit" && view === OPERATIONAL
          ? BUDGET_STATUSES.CONFIRMED
          : type === "submit"
          ? BUDGET_STATUSES.SUBMITTED
          : type === "draft" && view === OPERATIONAL
          ? BUDGET_STATUSES.SUBMITTED
          : BUDGET_STATUSES.DRAFT,
      _id: data?._id,
    };
    udpdateOrCreateBudget(dataToSave)
      .then((data) => {
        setModalOpen(false);
        enqueueSnackbar("Guardado", {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar("Error", {
          variant: "error",
        });
      })
      .finally(() => {
        setCurrentBudget(null);
        setFetching(true);
      });
  };
  const handleOpenForm = () => {
    setEditable(true);
    setModalOpen(true);
  };

  return (
    <>
      <div className="container relative flex flex-col items-center justify-start w-full gap-3 m-auto mt-2 bg-slate-100">
        <BudgetTable
          loading={false}
          tableTitle="Mis Trabajos Pendientes"
          actions={draftedActions}
          data={budgetDraftedList}
          styles={{ padding: "8px", height: `${size.height * 0.3}px` }}
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

              whiteSpace: "nowrap",
            },
            maxBodyHeight: `${size.height * 0.21}px`,
          }}
          toolbarComponent={
            view === COMMERCIAL ? (
              <div
                onClick={handleOpenForm}
                className="absolute flex items-center justify-center h-10 gap-3 px-4 ml-2 text-white bg-green-500 rounded cursor-pointer top-4 w-52 right-72 hover:bg-green-400"
              >
                Nuevo Trabajo
                <MdModeEdit />
              </div>
            ) : undefined
          }
        />
        <BudgetTable
          view={view}
          loading={false}
          tableTitle="Todos los Costos Operacionales"
          data={budgetSubmittedList}
          actions={submitedActions}
          styles={{ padding: "8px", height: `${size.height * 0.55}px` }}
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
              whiteSpace: "nowrap",
            },
            maxBodyHeight: `${size.height * 0.45}px`,
          }}
        />
      </div>
      <SimpleDialog isOpen={modalOpen} maxWidth="container">
        <AbmBudgetForm
          currentBudget={currentBudget ?? null}
          handleClose={handleClose}
          handleSave={handleSave}
          editable={editable}
          view={view}
        />
      </SimpleDialog>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default CommercialOperational;

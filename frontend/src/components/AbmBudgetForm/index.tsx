import CostDetailsTable from "../CostDetailsTable";
import { zones, workData } from "../../constants/formData";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import FormButtons from "./FormButtons";
import FormFields from "./FormFields";
import { IBudget, ICost } from "satelnet-types";
import { COMMERCIAL, OPERATIONAL } from "../../constants/views";
import _ from "lodash";
import { BUDGET_STATUSES } from "satelnet-constants";
import { getWorkOptions } from "../../hooks/useGetWorkOptions";
interface IProps {
  handleClose: any;
  handleSave?: (
    type: "draft" | "submit" | "approved" | "rejected",
    data: IBudget
  ) => void;
  currentBudget: IBudget | null;
  editable: boolean;
  view: string;
}

const AbmBudgetForm = ({
  handleClose,
  handleSave,
  currentBudget,
  editable,
  view,
}: IProps) => {
  const [costDetails, setCostDetails] = useState<ICost[]>(
    view === OPERATIONAL && currentBudget?.costs !== undefined
      ? currentBudget?.costs
      : workData?.[0]?.["second-level"]?.[0]?.["third-level"]?.[0]?.costs ?? []
  );
  const formik = useFormik<IBudget>({
    initialValues: {
      work: currentBudget?.work ?? workData[0]["first-level"],
      subWork: currentBudget?.subWork ?? workData[0]["second-level"]?.[0].value,
      subWork2:
        currentBudget?.subWork2 ??
        workData[0]["second-level"]?.[0]["third-level"][0].value,
      company: currentBudget?.company ?? "",
      zone: currentBudget?.zone ?? zones[0],
      dock: currentBudget?.dock ?? "",
      boat: currentBudget?.boat ?? "",
      aditionalNotes: currentBudget?.aditionalNotes ?? "",
    },
    onSubmit: (values, { resetForm, setErrors }) => {
      if (!formData?.company?.length) {
        setErrors({ company: "Required" });
        return;
      }
      if (
        saveType === "submit" &&
        (!formData?.boat?.length ||
          !formData?.dock?.length ||
          !formData?.company?.length)
      ) {
        setErrors({ boat: "Required", dock: "Required", company: "Required" });
        return;
      }
      const costDetailsToSave: ICost[] = costDetails ?? [];

      handleSave &&
        handleSave(saveType, {
          ...(currentBudget?._id ? { _id: currentBudget?._id } : {}),
          ...formData,
          costs: costDetailsToSave,
        });
      return;
    },
  });
  const [formData, setFormData] = useState<IBudget>(
    currentBudget ?? formik.values
  );
  const [options, setOptions] = useState<any>({});
  useEffect(() => {
    setCostDetails(currentBudget?.costs ?? options.costs ?? []);
  }, [options.costs, currentBudget]);

  useEffect(() => {
    setOptions(getWorkOptions(workData, formData));
  }, []);

  const handleChange = (value: any) => {
    const aux = {
      ...formData,
      ...value,
      ...(value.work
        ? { work: value.work, subWork: undefined, subWork2: undefined }
        : value.subWork
        ? { subWork: value.subWork, subWork2: undefined }
        : {}),
    };
    const workOptions = getWorkOptions(workData, aux);
    setOptions(workOptions);
    setFormData((prev) => ({
      ...prev,
      ...value,
      ...(value.work
        ? {
            subWork: workOptions?.subworkOptions?.[0].id,
            subWork2: workOptions?.subWork2Options?.[0].id,
          }
        : {}),
      ...(value.subWork
        ? { subWork2: workOptions?.subWork2Options?.[0].id }
        : {}),
    }));
  };
  const [saveType, setSaveType] = useState<"submit" | "draft" | "approved">(
    "draft"
  );

  const onRowAdd = (newData: ICost): Promise<ICost> => {
    const costToAdd: ICost = {
      ...newData,
    };
    const updatedCosts: ICost[] = structuredClone(costDetails);
    updatedCosts.push({ ...costToAdd, id: updatedCosts.length + 1 });
    setCostDetails(updatedCosts);
    return Promise.resolve(newData);
  };

  const onRowUpdate = (newData: ICost, oldData: ICost): Promise<ICost> => {
    const costToUpdate: ICost = {
      ...newData,
    };
    const updatedCosts: ICost[] = structuredClone(costDetails);
    updatedCosts[oldData.id - 1] = costToUpdate;
    setCostDetails(updatedCosts);
    return Promise.resolve(newData);
  };

  const onRowDelete = (oldData: ICost): Promise<ICost> => {
    const updatedCosts: ICost[] = structuredClone(costDetails);
    _.remove(updatedCosts, (data) => data.id === oldData.id);
    setCostDetails(
      updatedCosts.map((data, index) => ({ ...data, id: index + 1 }))
    );
    return Promise.resolve(oldData);
  };

  const handleReject = () => {
    if (
      currentBudget &&
      formData.aditionalNotes?.trim() === formik.values?.aditionalNotes?.trim()
    ) {
      formik.setErrors({ aditionalNotes: "Agregar observacion al rechazar" });
      return;
    }
    if (handleSave) handleSave("rejected", formData);
  };
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="container relative mx-auto h-[700px] flex flex-col">
        <MdClose
          onClick={handleClose}
          className="absolute right-0 w-8 h-8 cursor-pointer -top-4 hover:text-slate-500"
        />
        {/* FORM */}
        <details
          className="w-full transition rounded-lg open:ring-1 open:ring-black/5 dark:open:ring-white/10"
          open
        >
          <summary className="w-full my-4 font-semibold border border-t-0 border-slate-400 border-x-0">
            Datos del Cliente
          </summary>
          <div className="flex justify-center w-full">
            <FormFields
              works={options?.workOptions ?? []}
              zones={zones.map((element) => ({
                title: element,
                id: element,
              }))}
              subWorks={options?.subworkOptions ?? []}
              subWorks2={options?.subWork2Options ?? []}
              editable={editable}
              view={view}
              formData={formData}
              handleChange={handleChange}
              errors={formik.errors}
            />
          </div>
        </details>
        {/* END FORM */}
        <div className="w-full my-4 border border-t-0 border-slate-500 border-x-0">
          <p className="font-semibold">Detalles de Costos</p>
        </div>
        <div className="h-full overflow-y-scroll mb-14">
          <CostDetailsTable
            data={costDetails}
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
            }}
            onEdit={
              view === OPERATIONAL && editable
                ? { onRowAdd, onRowUpdate, onRowDelete }
                : undefined
            }
          />
        </div>
        {editable && (
          <FormButtons
            handleClose={handleClose}
            handleSave={() => {
              setSaveType("draft");
              formik.submitForm();
            }}
            handleSaveDraft={() => {
              setSaveType("submit");
              formik.submitForm();
            }}
            handleReject={
              view === OPERATIONAL && handleSave && currentBudget
                ? () => {
                    handleReject();
                  }
                : null
            }
          />
        )}
        {currentBudget?.status === BUDGET_STATUSES.CONFIRMED &&
          view === COMMERCIAL && (
            <div className="absolute bottom-0 flex justify-center w-full mt-5">
              <button
                name="save"
                onClick={() => {
                  setSaveType("approved");
                  formik.submitForm();
                }}
                className="px-4 py-2 transition-colors bg-green-500 rounded hover:bg-green-400"
              >
                APROBAR
              </button>
            </div>
          )}
        {/* EMD FORM */}
      </div>
    </form>
  );
};

export default AbmBudgetForm;

import { IBudget } from "satelnet-types";
import { FormikErrors } from "formik";
import { OPERATIONAL } from "../../constants/views";

interface IOptions {
  id: string;
  title: string;
}

interface IProps {
  works: IOptions[];
  subWorks: IOptions[];
  subWorks2: IOptions[];
  zones: IOptions[];
  // companies: IOptions[];
  editable: boolean;
  view: string;
  formData?: IBudget;
  handleChange: any;
  errors: FormikErrors<{
    boat: string;
    dock: string;
    company: string;
    aditionalNotes: string;
  }>;
}

const FormFields = ({
  works,
  subWorks,
  subWorks2,
  zones,
  editable,
  view,
  formData,
  handleChange,
  errors,
}: IProps) => {
  return (
    <div className="flex items-start justify-between w-3/5 gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="">
          <p className="formFieldTitle">Trabajo a desarrollar:</p>
          <select
            value={formData?.work}
            name="work"
            className="formField"
            disabled={view === OPERATIONAL || !editable}
            onChange={(e) => handleChange({ work: e.target.value })}
          >
            {works?.map((data: any, index: number) => {
              return (
                <option value={data?.id} key={`${index}-${data.id}`}>
                  {data.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          <p className="formFieldTitle">Subtipo de Trabajo:</p>
          <select
            value={formData?.subWork}
            onChange={(e) => handleChange({ subWork: e.target.value })}
            name="subWork"
            className="formField"
            disabled={view === OPERATIONAL || !editable}
          >
            {subWorks.map((data: any, index: number) => {
              return (
                <option value={data?.id} key={`${index}-${data.id}`}>
                  {data.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          <p className="formFieldTitle">Trabajo especifico:</p>
          <select
            value={formData?.subWork2}
            name="subWork2"
            className="formField"
            onChange={(e) => handleChange({ subWork2: e.target.value })}
            disabled={view === OPERATIONAL || !editable}
          >
            {subWorks2.map((data: any, index: number) => {
              return (
                <option value={data?.id} key={`${index}-${data.id}`}>
                  {data.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          <p className="formFieldTitle">Empresa:</p>
          <input
            autoComplete="off"
            name="company"
            type="text"
            className="formField"
            onChange={(e) => handleChange({ company: e.target.value })}
            value={formData?.company}
            disabled={view === OPERATIONAL || !editable}
          />
          {errors.company && (
            <div className="text-sm font-semibold text-red-500">
              {errors.company}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col">
          <p className="formFieldTitle">Zona:</p>
          <select
            name="zone"
            className="formField"
            value={formData?.zone}
            onChange={(e) => handleChange({ zone: e.target.value })}
            disabled={view === OPERATIONAL || !editable}
          >
            {zones.map((data: any, index: number) => {
              return (
                <option value={data?.id} key={`${index}-${data.id}`}>
                  {data.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="formFieldTitle">Centro o Muelle:</p>
          <input
            name="dock"
            autoComplete="off"
            className="formField"
            type="text"
            onChange={(e) => handleChange({ dock: e.target.value })}
            value={formData?.dock}
            disabled={view === OPERATIONAL || !editable}
          />
          {errors.dock && (
            <div className="text-sm font-semibold text-red-500">
              {errors.dock}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="formFieldTitle">Ponton/Barco:</p>
          <input
            name="boat"
            autoComplete="off"
            className="formField"
            type="text"
            onChange={(e) => handleChange({ boat: e.target.value })}
            disabled={view === OPERATIONAL || !editable}
            value={formData?.boat}
          />
          {errors.boat && (
            <div className="text-sm font-semibold text-red-500">
              {errors.boat}
            </div>
          )}
        </div>
        <div>
          <p className="formFieldTitle">Notas Adicionales:</p>
          <textarea
            className="formField"
            autoComplete="off"
            name="aditionalNotes"
            disabled={!editable}
            value={formData?.aditionalNotes}
            onChange={(e) => handleChange({ aditionalNotes: e.target.value })}
          />
          {errors.aditionalNotes && (
            <div className="text-sm font-semibold text-red-500">
              {errors.aditionalNotes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormFields;

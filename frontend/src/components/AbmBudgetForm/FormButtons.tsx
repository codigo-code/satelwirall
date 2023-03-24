interface IProps {
  handleClose: () => void;
  handleSave: () => void;
  handleSaveDraft: () => void;
  handleReject?: any;
}

const FormButtons = ({
  handleClose,
  handleSave,
  handleSaveDraft,
  handleReject,
}: IProps) => {
  return (
    <div className="absolute bottom-0 flex justify-center w-full mt-5">
      <div className="flex justify-between w-3/5 gap-10 text-slate-200">
        <button
          onClick={handleClose}
          className="px-4 py-2 transition-colors bg-red-500 rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <div className="flex gap-2">
          {handleReject && (
            <button
              onClick={handleReject}
              className="px-4 py-2 transition-colors bg-red-500 rounded hover:bg-red-600"
            >
              Rechazar
            </button>
          )}
          <button
            onClick={handleSave}
            name="draft"
            className="px-4 py-2 transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Guardar como Draft
          </button>
          <button
            name="save"
            onClick={handleSaveDraft}
            className="px-4 py-2 transition-colors bg-blue-500 rounded hover:bg-blue-600"
          >
            Guardar y Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormButtons;

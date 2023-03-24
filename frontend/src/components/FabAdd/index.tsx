import { SiAddthis } from "react-icons/si";

// @ts-ignoredisable ts-lint
export const FabAdd = (handleOnClick) => {
  return (
    <button onClick={handleOnClick}>
      <SiAddthis className="absolute flex items-center justify-center w-10 h-10 cursor-pointer bottom-10 right-10 text-slate-800 hover:text-slate-600" />
    </button>
  );
};

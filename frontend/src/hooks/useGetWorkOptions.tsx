import {
  WorkData,
  IBudget,
  SecondLevel,
  ThirdLevel,
} from "satelnet-types";

export const getWorkOptions = (
  workArray: WorkData[],
  budget: IBudget | null
) => {

  const firstOptions = workArray.map((element) => ({
    title: element["first-level"],
    id: element["first-level"].trim(),
  }));

  const workByFirstLevel: WorkData | undefined =
    budget?.work !== undefined
      ? workArray.find((element) => element["first-level"] === budget?.work)
      : undefined;

  const workBySecondLevel: SecondLevel[] | undefined = (workByFirstLevel ??
    workArray[0])["second-level"];

  const secondOptions = workBySecondLevel
    ? workBySecondLevel?.map((element) => ({
        title: element["value"],
        id: element["value"].trim(),
      }))
    : undefined;

  const workByThirdLevel: ThirdLevel[] | undefined =
    (budget?.subWork !== undefined &&
      workBySecondLevel?.find(
        (element) => element.value === budget?.subWork
      ) ||
      workBySecondLevel?.[0])?.["third-level"] ?? undefined;

  const thirdOptions = workByThirdLevel
    ? workByThirdLevel?.map((element) => ({
        title: element["value"],
        id: element["value"].trim(),
      }))
    : undefined;
  const costs =((budget?.subWork2 !== undefined && workByThirdLevel?.find(element=>element.value === budget?.subWork2)) || workByThirdLevel?.[0])?.costs 
  return {
    workOptions: firstOptions,
    subworkOptions: secondOptions,
    subWork2Options: thirdOptions,
    costs,
  };
};

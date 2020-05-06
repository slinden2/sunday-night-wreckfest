export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getSumOfArrayElements = (arr: number[] | undefined): number => {
  if (!arr) {
    throw new Error("You must provide an input array");
  }

  return arr.reduce((acc, cur) => acc + cur);
};

export const getSimpleTime = () => {
  const [date, time] = new Date().toISOString().split("T");
  const dateString = date.split("-").join("");
  const timeString = time.split(":").join("").split(".")[0];
  return `${dateString}-${timeString}`;
};

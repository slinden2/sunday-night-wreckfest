// A helper for throttling async operations.
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Sums together an array of numbers.
export const getSumOfArrayElements = (arr: number[] | undefined): number => {
  if (!arr) {
    throw new Error("You must provide an input array");
  }

  return arr.reduce((acc, cur) => acc + cur);
};

// Outputs time in YYYYMMDD-HHMMSS format
export const getSimpleTime = () => {
  const [date, time] = new Date().toISOString().split("T");
  const dateString = date.split("-").join("");
  const timeString = time.split(":").join("").split(".")[0];
  return `${dateString}-${timeString}`;
};

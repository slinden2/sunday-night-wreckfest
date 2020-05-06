import { sleep, getSumOfArrayElements, getSimpleTime } from "./misc";

jest.useFakeTimers();

describe("misc", () => {
  describe("sleep", () => {
    it("should sleep for 1 second with 1000", () => {
      expect.assertions(2);
      const pendingPromise = sleep(1000).then(() => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      });
      jest.runAllTimers();
      return pendingPromise;
    });
  });

  describe("getSumOfArrayElements", () => {
    it("should return a sum of array elements", () => {
      expect(getSumOfArrayElements([5, 5, 5])).toEqual(15);
    });
  });

  describe("getSimpleTime", () => {
    it("should return ISOString in YYYYMMDD-HHMMSS format", () => {
      const re = /\d{8}-\d{6}/.test(getSimpleTime());
      expect(re).toBeTruthy();
    });
  });
});

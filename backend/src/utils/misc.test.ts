import { sleep } from "./misc";

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
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.getSumOfArrayElements = (arr) => {
    if (!arr) {
        throw new Error("You must provide an input array");
    }
    return arr.reduce((acc, cur) => acc + cur);
};
exports.getSimpleTime = () => {
    const [date, time] = new Date().toISOString().split("T");
    const dateString = date.split("-").join("");
    const timeString = time.split(":").join("").split(".")[0];
    return `${dateString}-${timeString}`;
};
//# sourceMappingURL=misc.js.map
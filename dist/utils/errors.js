"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataIntegrityError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataIntegrityError";
    }
}
exports.DataIntegrityError = DataIntegrityError;
//# sourceMappingURL=errors.js.map
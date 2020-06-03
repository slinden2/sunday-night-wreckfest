"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
exports.dnsLookup = (domain) => {
    return new Promise((resolve, reject) => {
        dns_1.default.lookup(domain, (err, address, _family) => {
            if (err)
                reject(err);
            resolve(address);
        });
    });
};
//# sourceMappingURL=steamUtils.js.map
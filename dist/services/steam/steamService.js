"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const steamUtils_1 = require("./steamUtils");
const helpers_1 = require("../helpers");
exports.getSNWServers = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${config_1.default.STEAM_API_KEY}&limit=10000&filter=appid\\228380`);
    const wfServers = res.data.response.servers;
    if (!config_1.default.LABBE_DOMAIN) {
        throw new Error("Missing LABBE_DOMAIN env variable.");
    }
    const ipAddress = yield steamUtils_1.dnsLookup(config_1.default.LABBE_DOMAIN);
    const snwServers = wfServers
        .filter(srv => srv.addr.includes(ipAddress) &&
        config_1.default.WF_SERVER_PORT_ARRAY.includes(srv.gameport))
        .map(srv => ({
        name: helpers_1.parseServerName(srv.name),
        players: srv.players,
        maxPlayers: srv.max_players,
    }));
    return snwServers;
});
exports.default = { getSNWServers: exports.getSNWServers };
//# sourceMappingURL=steamService.js.map
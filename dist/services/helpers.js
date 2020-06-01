"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../utils/errors");
const types_1 = require("../types");
exports.isString = (param) => {
    return typeof param === "string" || param instanceof String;
};
exports.parseEventId = (eventId, type) => {
    if (!eventId || !exports.isString(eventId) || eventId.length !== 4) {
        throw new errors_1.DataIntegrityError(`Invalid or missing ${type}: ${eventId}`);
    }
    return eventId;
};
exports.parseString = (str, field) => {
    if (!str || !exports.isString(str)) {
        throw new errors_1.DataIntegrityError(`Invalid or missing ${field}: ${str}`);
    }
    return str;
};
exports.isNumber = (param) => {
    return !isNaN(Number(param)) && typeof param !== "boolean";
};
exports.parseNumericBoolean = (param, field) => {
    if (!param ||
        !exports.isNumber(param) ||
        (Number(param) !== 0 && Number(param) !== 1)) {
        throw new errors_1.DataIntegrityError(`Invalid or missing ${field}: ${param}`);
    }
    return Boolean(Number(param));
};
exports.parsePowerLimit = (text) => {
    if (!text)
        return "";
    if (!/[DCBA]\d{2,3}/.test(text)) {
        throw new errors_1.DataIntegrityError("Invalid powerLimit: " + text);
    }
    return text;
};
exports.parseEventIds = (eventIdsStr) => {
    const eventIds = eventIdsStr.split(";");
    eventIds.forEach(eventId => {
        exports.parseEventId(eventId, "eventId");
    });
    return eventIds;
};
exports.isNumeric = (str) => {
    return /^\d+$/.test(str);
};
exports.parseDriverId = (driverId) => {
    if (!driverId ||
        !exports.isString(driverId) ||
        !exports.isNumeric(driverId) ||
        !(driverId.length === 4)) {
        throw new errors_1.DataIntegrityError("Invalid or missing driverId: " + driverId);
    }
    return driverId;
};
exports.isLapTime = (time) => {
    return /^\d{2}:\d{2},\d{3}$/.test(time);
};
exports.parseLapTime = (time) => {
    if (!time || !exports.isString(time) || !exports.isLapTime(time)) {
        throw new errors_1.DataIntegrityError("Invalid or missing qTime: " + time);
    }
    return time;
};
const isRaceGroup = (group) => {
    return Object.values(types_1.RaceGroup).includes(group);
};
exports.parseGroup = (group) => {
    if (!group || !isRaceGroup(group)) {
        throw new errors_1.DataIntegrityError("Invalid or missing group: " + group);
    }
    return group;
};
exports.parseHeatPositions = (positions) => {
    positions.forEach(pos => {
        if (!exports.isNumber(pos)) {
            throw new errors_1.DataIntegrityError("Invalid position: " + pos);
        }
    });
    return positions.map(pos => Number(pos));
};
exports.isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.parseDate = (date) => {
    if (!date || !exports.isString) {
        throw new errors_1.DataIntegrityError("Date is not a string or it is missing date: " + date);
    }
    const newDate = date
        .split(".")
        .map(item => {
        if (item.length < 2) {
            return item.padStart(2, "0");
        }
        else {
            return item;
        }
    })
        .reverse()
        .join("-");
    const [year, month, days] = newDate.split("-");
    if (!exports.isDate(newDate) ||
        year.length !== 4 ||
        month.length !== 2 ||
        days.length !== 2) {
        throw new errors_1.DataIntegrityError("Incorrect date format. Must be DD-MM-YYY: " + date);
    }
    return newDate;
};
exports.parseNumber = (num, field) => {
    if (!num || !exports.isNumber(num)) {
        throw new errors_1.DataIntegrityError(`Invalid or missing ${field}: ${num}`);
    }
    return Number(num);
};
exports.isVideoDataString = (text) => {
    if (/^((twitch|twitchClip|youtube),[a-zA-Z0-9]+;)+$/.test(text))
        return true;
    else
        return false;
};
exports.isVideoService = (text) => {
    if (Object.values(types_1.VideoService).includes(text))
        return true;
    else
        return false;
};
exports.parseVideos = (videoDataString) => {
    if (!exports.isVideoDataString(videoDataString)) {
        throw new errors_1.DataIntegrityError("Invalid videoDataString " + videoDataString);
    }
    const videoDataArrays = videoDataString
        .substr(0, videoDataString.length - 1)
        .split(";");
    const videoData = videoDataArrays.map(video => {
        const [service, id] = video.split(",");
        if (!exports.isVideoService(service)) {
            throw new errors_1.DataIntegrityError("Invalid VideoService " + service);
        }
        return { service: types_1.VideoService[service], id };
    });
    return videoData;
};
exports.isModDataString = (text) => {
    if (/^(\w+,[\w:\/\\.\?&=]+;)+$/.test(text))
        return true;
    else
        return false;
};
exports.parseMods = (modString) => {
    if (!exports.isModDataString(modString)) {
        throw new errors_1.DataIntegrityError("Invalid videoDataString " + modString);
    }
    const modDataArrays = modString.substr(0, modString.length - 1).split(";");
    const modData = modDataArrays.map(mod => {
        const [name, url] = mod.split(",");
        if (!name || !exports.isString(name)) {
            throw new errors_1.DataIntegrityError("Invalid modName: " + name);
        }
        if (!url || !exports.isString(url)) {
            throw new errors_1.DataIntegrityError("Invalid modUrl: " + url);
        }
        return { name, url };
    });
    return modData;
};
exports.isCarString = (text) => {
    if (/^(\w+;)+$/.test(text))
        return true;
    else
        return false;
};
exports.parseCars = (carString) => {
    if (!exports.isCarString(carString)) {
        throw new errors_1.DataIntegrityError("Invalid cars: " + carString);
    }
    const carDataArrays = carString.substr(0, carString.length - 1).split(";");
    const carData = carDataArrays.map((car) => {
        if (!car || !exports.isString(car)) {
            throw new errors_1.DataIntegrityError("Invalid cars: " + carString);
        }
        return car;
    });
    return carData;
};
//# sourceMappingURL=helpers.js.map
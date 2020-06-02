/* 
Utility functions used by more than one files.
*/

import marked from "marked";
import { DataIntegrityError } from "../utils/errors";
import { RaceGroup, VideoType, VideoService, Mod } from "../types";

export const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

export const parseEventId = (eventId: string, type: string): string => {
  if (!eventId || !isString(eventId) || eventId.length !== 4) {
    throw new DataIntegrityError(`Invalid or missing ${type}: ${eventId}`);
  }

  return eventId;
};

export const parseString = (str: any, field: string): string => {
  if (!str || !isString(str)) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${str}`);
  }

  return str;
};

export const isNumber = (param: any): param is number => {
  return !isNaN(Number(param)) && typeof param !== "boolean";
};

export const parseNumericBoolean = (param: string, field: string): boolean => {
  if (
    !param ||
    !isNumber(param) ||
    (Number(param) !== 0 && Number(param) !== 1)
  ) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${param}`);
  }

  return Boolean(Number(param));
};

export const parsePowerLimit = (text: any): string => {
  if (!text) return "";

  if (!/[DCBA]\d{2,3}/.test(text)) {
    throw new DataIntegrityError("Invalid powerLimit: " + text);
  }

  return text;
};

export const parseEventIds = (eventIdsStr: any): string[] => {
  const eventIds: string[] = eventIdsStr.split(";");

  eventIds.forEach(eventId => {
    parseEventId(eventId, "eventId");
  });

  return eventIds;
};

export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

export const parseDriverId = (driverId: any): string => {
  if (
    !driverId ||
    !isString(driverId) ||
    !isNumeric(driverId) ||
    !(driverId.length === 4)
  ) {
    throw new DataIntegrityError("Invalid or missing driverId: " + driverId);
  }

  return driverId;
};

export const isLapTime = (time: any): boolean => {
  return /^\d{2}:\d{2},\d{3}$/.test(time);
};

export const parseLapTime = (time: any): string => {
  if (!time || !isString(time) || !isLapTime(time)) {
    throw new DataIntegrityError("Invalid or missing qTime: " + time);
  }

  return time;
};

const isRaceGroup = (group: any): group is RaceGroup => {
  return Object.values(RaceGroup as any).includes(group);
};

export const parseGroup = (group: any): RaceGroup => {
  if (!group || !isRaceGroup(group)) {
    throw new DataIntegrityError("Invalid or missing group: " + group);
  }

  return group;
};

export const parseHeatPositions = (positions: Array<any>): Array<number> => {
  positions.forEach(pos => {
    if (!isNumber(pos)) {
      throw new DataIntegrityError("Invalid position: " + pos);
    }
  });

  return positions.map(pos => Number(pos));
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: string): string => {
  if (!date || !isString) {
    throw new DataIntegrityError(
      "Date is not a string or it is missing date: " + date
    );
  }

  const newDate = date
    .split(".")
    .map(item => {
      if (item.length < 2) {
        return item.padStart(2, "0");
      } else {
        return item;
      }
    })
    .reverse()
    .join("-");

  const [year, month, days] = newDate.split("-");

  if (
    !isDate(newDate) ||
    year.length !== 4 ||
    month.length !== 2 ||
    days.length !== 2
  ) {
    throw new DataIntegrityError(
      "Incorrect date format. Must be DD-MM-YYY: " + date
    );
  }

  return newDate;
};

export const parseNumber = (num: any, field: string): number => {
  if (!num || !isNumber(num)) {
    throw new DataIntegrityError(`Invalid or missing ${field}: ${num}`);
  }

  return Number(num);
};

export const isVideoDataString = (text: string): boolean => {
  if (/^((twitch|twitchClip|youtube),[a-zA-Z0-9]+;)+$/.test(text)) return true;
  else return false;
};

export const isVideoService = (text: any): text is VideoService => {
  if (Object.values(VideoService).includes(text)) return true;
  else return false;
};

export const parseVideos = (videoDataString: string): VideoType[] => {
  if (!isVideoDataString(videoDataString)) {
    throw new DataIntegrityError("Invalid videoDataString " + videoDataString);
  }

  const videoDataArrays = videoDataString
    .substr(0, videoDataString.length - 1)
    .split(";");

  const videoData = videoDataArrays.map(video => {
    const [service, id] = video.split(",");

    if (!isVideoService(service)) {
      throw new DataIntegrityError("Invalid VideoService " + service);
    }

    return { service: VideoService[service], id };
  });

  return videoData;
};

export const isModDataString = (text: any): boolean => {
  // eslint-disable-next-line no-useless-escape
  if (/^([\w\s.]+,[\w:\/\\.\?&=]+;)+$/.test(text)) return true;
  else return false;
};

export const parseMods = (modString: string): Mod[] => {
  if (!isModDataString(modString)) {
    throw new DataIntegrityError("Invalid videoDataString " + modString);
  }

  const modDataArrays = modString.substr(0, modString.length - 1).split(";");

  const modData = modDataArrays.map(mod => {
    const [name, url] = mod.split(",");

    if (!name || !isString(name)) {
      throw new DataIntegrityError("Invalid modName: " + name);
    }

    if (!url || !isString(url)) {
      throw new DataIntegrityError("Invalid modUrl: " + url);
    }

    return { name, url };
  });

  return modData;
};

export const isCarString = (text: any): boolean => {
  if (/^([\w\s]+;)+$/.test(text)) return true;
  else return false;
};

export const parseCars = (carString: any): string[] => {
  if (!isCarString(carString)) {
    throw new DataIntegrityError("Invalid cars: " + carString);
  }

  const carDataArrays = carString.substr(0, carString.length - 1).split(";");

  const carData: string[] = carDataArrays.map((car: any) => {
    if (!car || !isString(car)) {
      throw new DataIntegrityError("Invalid cars: " + carString);
    }

    return car;
  });

  return carData;
};

export const parseDescription = (descriptionString: any): string => {
  return marked(descriptionString);
};

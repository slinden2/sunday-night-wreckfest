import { IRaceCalendarEvent, ISeason, ISeasonHash } from "../types";

interface HasEventId {
  eventId: string;
}

export function arrToObj<T extends HasEventId>(arr: T[]) {
  return arr.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.eventId]: cur,
    };
  }, {});
}

// Converts simple calendar events to an array
// grouped of objects grouped by season.
export function calendarToSeasons(events: IRaceCalendarEvent[]): ISeason[] {
  const eventsBySeason = events.reduce<ISeasonHash>(
    (acc, cur: IRaceCalendarEvent) => {
      const { seasonId, seasonName, ...event } = cur;
      if (!acc[cur.seasonId]) {
        acc[seasonId] = {
          seasonId,
          seasonName,
          isCompleted: false,
          events: [event],
        };
      } else {
        acc[seasonId].events.push(event);
      }
      return acc;
    },
    {}
  );

  const seasons: ISeason[] = Object.keys(eventsBySeason).map(key => ({
    ...eventsBySeason[key],
  }));

  const seasonsWithIsCompleted = seasons.map(season => ({
    ...season,
    isCompleted: season.events.every(event => event.isCompleted),
  }));

  return seasonsWithIsCompleted;
}

// Supported format: MM:SS,FFF
export const convertTimeToSecs = (time: string): number => {
  return time
    .split(/[:,]/)
    .map((segment, i) => {
      if (i === 0) return 60 * Number(segment);
      if (i === 1) return Number(segment);
      else return Number(segment) / 1000;
    })
    .reduce((acc, cur) => acc + cur);
};

// DD.MM.YYYY
export const getFinnishDate = (str: string): string => {
  const rawDate = new Date(str);
  const date = String(rawDate.getDate()).padStart(2, "0");
  const month = String(rawDate.getMonth() + 1).padStart(2, "0");
  const year = String(rawDate.getFullYear());
  return `${date}.${month}.${year}`;
};

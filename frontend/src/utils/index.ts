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

  return seasons;
}

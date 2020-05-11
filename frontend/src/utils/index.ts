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

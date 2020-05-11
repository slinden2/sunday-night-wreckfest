export interface IRaceCalendarEvent {
  eventId: string;
  isCompleted: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
}

export interface INavItem {
  title: string;
  url: string;
}

export interface IRaceCalendarEvent {
  eventId: string;
  isReady: boolean;
  isCompleted: boolean;
  isProcessed: boolean;
  hasPowerLimit: boolean;
  date: string;
  trackName: string;
  qLaps: number;
  raceLaps: number;
}

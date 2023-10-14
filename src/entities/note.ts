export interface Note {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  summary: string;
  timeCreated: number;
  lastTimeUpdated: number;
  color: string;
  isOneDayEvent: boolean;
}

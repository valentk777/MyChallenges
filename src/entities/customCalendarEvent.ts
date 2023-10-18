import {ICalendarEventBase} from 'react-native-big-calendar';

export interface CustomCalendarEvent extends ICalendarEventBase {
  id: string;
  summary: string;
  color: string;
  isFullDayEvent: boolean;
  timeCreated: Date;
}

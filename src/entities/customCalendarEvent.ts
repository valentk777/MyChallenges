import { ReactElement } from 'react';

export interface CustomCalendarEvent {
  start: Date
  end: Date
  title: string
  children?: ReactElement | null
  hideHours?: boolean
  disabled?: boolean
  id: string;
  summary: string;
  color: string;
  isFullDayEvent: boolean;
  timeCreated: Date;
}
